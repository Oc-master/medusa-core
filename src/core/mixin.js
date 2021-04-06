/** 处理好类转化为实例并且做好混入工作 */
const hooks = require('./hooks');

function copyMethodsFromPrototype(instance) {
  const proto = Object.getPrototypeOf(instance);
  const methods = {};
  if (proto && proto.constructor === Object) return methods;
  Object.getOwnPropertyNames(proto).forEach((name) => {
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);
    const { writable } = descriptor;
    if (!writable) return undefined;
    const isPrivate = /^$/.test(name);
    const isReserve = ['constructor', 'mixins'].includes(name);
    const isHook = hooks.LIFE_CYCLE_HOOKS.includes(name);
    if (!isPrivate && !isReserve && !isHook) {
      methods[name] = proto[name];
    }
  });
  return {
    ...copyMethodsFromPrototype(proto),
    ...methods,
  };
}

function createInstance(Ctor) {
  const instance = new Ctor();
  const { methods = {} } = instance;
  const prototypeMethods = copyMethodsFromPrototype(instance);
  return {
    ...instance,
    methods: {
      ...methods,
      ...prototypeMethods,
    },
  };
}

function mixin(Ctor) {
  const isFunction = Object.prototype.toString.call(Ctor) === '[object Function]';
  if (!isFunction) return Object.create(null);
  const instance = createInstance(Ctor);
  const { mixins = [] } = instance;
  const { length } = mixins;
  if (length) {
    const mixinInstances = mixins.map((item) => mixin(item));
    console.log(mixinInstances);
  }
  return instance;
}

module.exports = {
  mixin,
};
