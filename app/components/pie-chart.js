import D3Base from './d3-base';
import d3 from 'npm:d3';

export default D3Base.extend({
  tagName: 'svg',

  attributeBindings: ['width, height'],

  arc: null,
  elementClass: 'pie-chart',
  color: null,
  data: null,
  labelArc: null,
  height: 360,
  radius: null,
  svg: null,
  width: 360,

  didInsertElement() {
    const data = this.get('data');

    this.setColor();
    this.setRadius();
    this.setArc();
    this.setLabelArc();
    this.setSvg();
    this.buildChart(data);

    this._super(...arguments);
  },

  setArc() {
    const radius = this.get('radius');
    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

    this.set('arc', arc);
  },

  buildChart(data) {
    const {
      arc,
      labelArc,
      color,
      _setPie,
      _setG,
      svg,
    } = this.getProperties(
      'arc',
      'labelArc',
      'color',
      '_setPie',
      '_setG',
      'svg'
    );
    const pie = _setPie(data);
    const g = _setG(svg, pie);

    g.append('path')
      .attr('d', arc)
      .style('fill', (d, i) => color(i))
      .style('stroke', '#222');

    g.append('text')
      .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
      .text((d) => d.data.name)
      .attr('text-anchor', 'middle')
      .style('fill', '#FFF');
  },

  setColor() {
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    this.set('color', color);
  },

  setLabelArc() {
    const radius = this.get('radius');
    const labelArc = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);

    this.set('labelArc', labelArc);
  },

  setRadius() {
    const {
      height,
      width,
    } = this.getProperties(
      'height',
      'width'
    );
    const radius = Math.min(width, height) / 2;

    this.set('radius', radius);
  },

  setSvg() {
    const {
      height,
      formattedClassName,
      width,
    } = this.getProperties(
      'height',
      'formattedClassName',
      'width'
    );
    const svg = d3.select(formattedClassName)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);

    this.set('svg', svg);
  },

  _setG(svg, pie) {
    return svg.selectAll('arc')
      .data(pie)
      .enter()
      .append('g')
      .attr('class', 'arc');
  },

  _setPie(data) {
    const pie = d3.pie().value((d) => d.count)(data);

    return pie;
  },
});
