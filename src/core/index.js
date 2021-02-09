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

  compileApp(vm) {
    const instance = mixin(vm);
    const { methods } = instance;
    Object.keys(methods).forEach((key) => { instance[key] = methods[key]; });
    App(instance);
  }

  compilePage(vm) {
    const instance = mixin(vm);
    const { methods } = instance;
    Object.keys(methods).forEach((key) => { instance[key] = methods[key]; });
    Page(instance);
  }
}

module.exports = new Core();
