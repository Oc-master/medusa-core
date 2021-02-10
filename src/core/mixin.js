const hooks = require('./hooks');

const tracePrototypeMethods = (obj) => {
  const methods = Object.getOwnPropertyNames(obj).reduce((acc, key) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    const { writable } = descriptor;
    if (!writable) {
      return acc;
    }
    const isEmpty = /^$/.test(key);
    const isReserve = ['constructor', 'mixins'].includes(key);
    const isHook = hooks.includes('key');
    if (!isEmpty && !isReserve && !isHook) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
  return methods;
};

const copyMethod = (vm) => {
  const instance = new vm();
  const { methods = {} } = instance;
  const traceMethods = tracePrototypeMethods(vm.prototype);
  return Object.assign(instance, {
    methods: {
      ...methods,
      ...traceMethods,
    },
  });
};

const createInstance = (vm) => {
  const isFunction = typeof vm === 'function';
  if (isFunction) {
    return copyMethod(vm);
  }
  return Object.create(null);
};

function mixin(vm) {
  if (vm === null) return Object.create(null);
  const instance = createInstance(vm);
  return instance;
}

module.exports = mixin;
