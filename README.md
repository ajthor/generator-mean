# MEAN Generator
MEAN Generator is a Yeoman generator for scaffolding applications based on the MEAN stack. MEAN is a set of features which work well together in creating full-stack applications.

List of generators:

- app (main)
- boilerplate (hooked from app)
- common (hooked from app)
- AngularJS Generators
    - controller
    - decorator
    - directive
    - filter
    - module
    - provider
    - route
    - service
    - view

List of possible options to use:
    --dont-ask : Don't show any dialogs for user interaction. If run on the main generator, it will default to no RequireJS support.
    --skip-add : Don't add the script tag to the index.html file or scripts configuration. Just create the files.
    --reset-scripts : Will reset all scripts in the index.html file and replace them with the current scripts configuration.
    --remove : Used on AngularJS Generators to remove the script from the configuration.

## app
    yo mean
Generator responsible for setting the configuration options for the project. Gets input from the user about what sort of features the user would like to include and adds them to the stack. Possible to include:
    - RequireJS Support

*Hooks for: boilerplate, common*

## boilerplate
    yo mean:boilerplate
Generator responsible for creating scaffolding for application, including directory structure and basic files. Call this generator standalone to specify custom directories for files.

### Default Directory Structure:
    app
    app/views
    app/routes
    app/controllers
    app/models
    public
    public/img
    public/css
    public/js
    public/js/vendor
    public/views
    config
    test
    test/specs
    build
    
## common
    yo mean:common
Generator responsible for creating application specific files and config such as:

    bower.json
    package.json
    Gruntfile.js
    app.js
    main.js (RequireJS only)
    index.html
    
## AngularJS Generators 
    yo mean:module "name"

Optional argument: name
If no name is specified, generator will default to using the component type (Controller, Filter, etc.)

Generator responsible for creating AngularJS modules which are created immediately, but also stored in a configuration file for later compilation. Currently has support for: modules, controllers, directives, filters, and services. Other generators are not yet fully supported and may not work.
