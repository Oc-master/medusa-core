const { mixin } = require('./mixin');

class Core {
  constructor() {
    this.$$buildMap = new Map([
      ['APP', this.buildApp.bind(this)],
      ['PAGE', this.buildPage.bind(this)],
    ]);

    this.build = function build(Ctor, type, routes) {
      return this.$$buildMap.get(type).call(null, Ctor, routes);
    };
  }

  buildApp(Ctor) {
    const instance = mixin(Ctor);
    const { methods } = instance;
    Object.keys(methods).forEach((key) => { instance[key] = methods[key]; });
    App(instance);
  }

  buildPage(Ctor) {
    const instance = mixin(Ctor);
    const { methods } = instance;
    Object.keys(methods).forEach((key) => { instance[key] = methods[key]; });
    Page(instance);
  }
}

module.exports = new Core();
