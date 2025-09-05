// Polyfill for browser globals in server environment
if (typeof global !== "undefined" && !global.self) {
  global.self = global;
}

if (typeof globalThis !== "undefined" && !globalThis.self) {
  globalThis.self = globalThis;
}