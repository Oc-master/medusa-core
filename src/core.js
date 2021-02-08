import mixin from './mixin';

export class Medusa {
  constructor() {
    this.compileMap = new Map([
      ['app', this.compileApp.bind(this)],
    ]);
  }

  compile(type, vm) {
    const lowserCaseType = type.toLowerCase();
    return this.compileMap.get(lowserCaseType).call(null, vm);
  }

  compileApp(vm) {
    const instance = mixin(vm);
    App(instance);
  }
}

export const medusa = new Medusa();
