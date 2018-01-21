import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [
        {name: 'Cups', count: 30},
        {name: 'Plates', count: 12},
        {name: 'Forks', count: 45},
        {name: 'Knives', count: 25},
        {name: 'Napkins', count: 50},
      ];
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('data', model);
  },
});
