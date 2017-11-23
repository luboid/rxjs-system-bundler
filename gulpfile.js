const gulp = require("gulp");

const rxSource = "./node_modules/rxjs/src/**/*.ts";
const dist = "./dist";
const library = "rxjs";

gulp.task("clear:rxjs", function(callback) {
  const rimraf = require("rimraf");
  rimraf(dist + "/" + library, callback);
});

gulp.task("compile:rxjs", ["clear:rxjs"], function() {
  const ts = require("gulp-typescript");
  const tsResult = gulp.src(rxSource).pipe(
    ts({
      target: "es5",
      module: "commonjs",
      moduleResolution: "node",
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      lib: ["es2017", "dom"],
      noImplicitAny: true,
      suppressImplicitAnyIndexErrors: true,
      noEmitHelpers: true,
      importHelpers: true
    })
  );

  return tsResult.js.pipe(gulp.dest(dist + "/rxjs"));
});

function bundle_rxjs() {
  const Builder = require("systemjs-builder");
  const config = {
    meta: {
      tslib: {
        build: false
      }
    },
    packages: {
      rxjs: {
        defaultExtension: "js",
        main: "Rx",
        format: "cjs"
      },
      "rxjs/operators": {
        defaultExtension: "js",
        main: "index",
        format: "cjs"
      }
    }
  };

  const create = function(settings = {}) {
    const builder = new Builder(dist, config);
    return builder.bundle(
      library,
      dist +
        "/" +
        library +
        (settings && settings.minify ? ".min" : "") +
        ".js",
      settings
    );
  };

  return Promise.all([
    create(),
    create({
      minify: true,
      mangle: true,
      sourceMaps: true,
      sourceMapContents: true // truely self contained SourceMaps which will not need to load the external original source files
    })
  ]);
}

gulp.task("bundle-only:rxjs", bundle_rxjs);
gulp.task("bundle:rxjs", ["compile:rxjs"], bundle_rxjs);
