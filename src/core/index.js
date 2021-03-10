const mixin = require('./mixin');

class Core {
  constructor() {
    const compileMap = new Map([
      ['app', this.compileApp.bind(this)],
      ['page', this.compilePage.bind(this)],
    ]);
    this.compile = function compile(type, vm) {
      const lowerCaseType = type.toLowerCase();
      return compileMap.get(lowerCaseType).call(null, vm);
    };
  }

  $$buildMap = new Map([
    ['APP', this.buildApp.bind(this)],
    ['PAGE', this.buildPage.bind(this)],
  ])

  build = function build(Ctor, type, routes) {
    return this.$$buildMap.get(type).call(null, Ctor, routes);
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
