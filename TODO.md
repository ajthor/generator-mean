# TODO LIST

## Features to add:
- ~~add boilerplate generator~~
- ~~add common generator~~
- ~~add build generator to rebuild directory structure and index.html, e.g.~~
- add express features
- ~~path property on modules?~~
- ~~add module option to module generator.~~
- ~~add argument support to module & biolerplate generator. Only call module generator prompt if the arguments are not set.~~
- ~~add looping support for buildModule function.~~
- add stylus support to css creation blocks
- add option to remove a module in the module generator
- ~~add module list to the module generator~~

### Tentative features:
- add application module support
- add directory structure to templates directory. 
- ~~add current module property to config. new modules get the current module added to their definition at creation.~~
- ~~add argument to boilerplate or common generators to specify directory structure or simply set default. if hooked, create default. if called anywhere else, give prompts.~~

## Features to remove:
- ~~remove unnecessary dialog prompts~~
    - ~~remove 'other' option in main dependency creator~~
    - ~~remove route options in controller creator~~
    
## Changes to make:
- change validation function to have an options argument instead of an optional true argument.
- ~~change bowerrc template to go to vendor directory. *means the flow will be: app -> boilerplate -> create bowerrc*~~