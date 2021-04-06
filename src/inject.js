const core = require('./core');

function inject(exports, type, route) {
  Object.defineProperty(exports, 'default', {
    get() {
      return this.$value;
    },
    set(Ctor) {
      this.$value = Ctor;

      core(Ctor, type, route);
    },
  });
}

module.exports = {
  inject,
};
