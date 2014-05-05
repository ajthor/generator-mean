# Configuration Files

Files in this directory are related to the server configuration, including setting up the Express server, the node environment config, and the authentication config.



## Express.js Config (express.js)

Contains the configuration for the Express.js server. By default, it includes several features:
- MongoDB support
- Passport
- Node Templating (via Consolidate -- change in `all.js`)

In order to set some default routes--not including index.html or any partials--append middleware to the bottom of the Express.js config.



## Environment Config (config.js)

Merges files together to serve as the configuration file. Merges `all.js` and some other config file in the `env` folder.

### All.js

Generic config for all environments.

### Development.js

Development environment.

### Production.js

Production environment.

### Test.js

Test environment.

