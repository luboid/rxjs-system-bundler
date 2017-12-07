System.config({
  paths: {
    "rxjs-bundle": "/dist/rxjs.js"
  },
  bundles: {
    "rxjs-bundle": ["rxjs/*"]
  },
  packages: {
    rxjs: {
      defaultExtension: "js",
      main: "Rx"
    }
    //"rxjs/operators": {
    //  defaultExtension: "js",
    //  main: "index"
    //}
  }
});
