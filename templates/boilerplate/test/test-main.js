var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/\.spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    
    baseUrl: '../public/js',

    paths: {
        'angular': 'vendor/angular/angular'
    },

    shim: {
        'angular': {
            exports: 'angular'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});