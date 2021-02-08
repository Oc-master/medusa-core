const copyMethodFromClass = (vm) => {
  const isFunction = typeof vm === 'function';
  if (isFunction) {
    const instance = new vm();
    vm = instance;
  }
  return vm;
};

const mixin = (vm) => {
  if (vm === null) return {};
  vm = copyMethodFromClass(vm);
  return vm;
};

export default mixin;
