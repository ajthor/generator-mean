# MEAN Generator
MEAN Generator is a Yeoman generator for scaffolding applications based on the MEAN stack. MEAN is a set of features which work well together in creating full-stack applications.

List of generators:

- app (main)
- boilerplate (hooked from app)
- common (hooked from app)
- module
- build

## app
    yo mean
Generator responsible for setting the configuration options for the project. Gets input from the user about what sort of features the user would like to include and adds them to the stack.

*Hooks for: boilerplate, common*

## boilerplate
    yo mean:boilerplate
Generator responsible for creating scaffolding for application, including directory structure and basic files.

### Directory structure:
    app
    app/views
    public
    public/img
    public/css
    public/js
    public/js/vendor
    public/views
    test
    
## common
    yo mean:common
Generator responsible for creating application specific files and config such as:

    bower.json
    package.json
    Gruntfile.js
    
## module 
    yo mean:module
Generator responsible for creating AngularJS modules which are created immediately, but also stored in a configuration file for later compilation. Currently has support for: modules, controllers, directives, filters, and services.

## build 
    yo mean:build
Generator which is responsible for building the module tree stored in the configuration. rebuilds files such as index.html to include the controllers and other required files for the application.
Run this after creating new modules to rebuild the source for usemin tasks which are executed during grunt build tasks and correct dependency creation in modules. 

*Running the build generator does not affect the source already in index.html, it simply adds usemin blocks to the source.*