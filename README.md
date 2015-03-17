# Oregon's Catch

An [Oregon Sea Grant](http://seagrant.oregonstate.edu/) mobile app for finding fresh sea food on the Oregon coast.

# Requirements

- [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/)
- [Sencha Touch API](http://www.sencha.com/products/touch) (already included)
- [Node.js](https://nodejs.org/)
    - [npm](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)
        - [Phonegap](http://phonegap.com/)
        - [Cordova](http://cordova.apache.org/)
        - [LintRoller](https://github.com/arthurakay/LintRoller) (optional)
- [Android development environment](http://developer.android.com/sdk/index.html) and/or [iOS development environment](https://developer.apple.com/xcode/)

## Development Environment Setup
To support the above requirements, you will likely need to install and configure the following items on your development machine:
- OpenJDK
- Apache Ant
- Ruby v1.9.3
- git

[Ubuntu 14.04 64-bit setup Gist](https://gist.github.com/jhcarr/c0276b2978b8603c74e3)

# Build

1. Ensure that your environment meets the requirements above.
2. Navigate to your development space and run `git clone` on this repo.
3. Navigate into the new project directory
    - run `sencha app build` to compile web version of the project. Results will appear in */build/production*.
    - run `sencha app build ios` to compile the iOS version of the project. Results will appear in */phonegap/platforms/ios*.
    - run `sencha app build android` to compile the Android version of the project. Results will appear in *phonegap/platforms/android/*.
    - run `sencha web start` to launch a jetty server and view web build results.

# Test

1. Run `sencha web start` at the root directory of the project
2. Open your favorite browser and navigate to localhost at the port indicated by the output of `sencha web start`.
    - **If you are unit testing:** navigate the browser into *./tests/jasmine-standalone/*
    - ~~**If you are UI testing:** navigate the browser into *./tests/siesta-2.0.8-lite/*~~ Siesta's CDN is currently broken.

# Lint

If your editor does not have a built-in javascript linter:

```bash
# Install LintRoller locally
cd ./syntax
npm install

# Run the criticize-me.sh script
./criticize-me.sh

# Open error-log.txt file for results
open error-log.txt
```

# Docs

To view project documentation:
1. Ensure `sencha web start` is running at the root of the project.
2. In *./docs*, run `make html`
3. Open your browser and navigate to localhost:(port number)/docs/build/

For information about generating project documentation, navigate to *./docs* and run `make` with no arguments.

# Structure

*./.sencha*  
Sencha configuration and internal resources.

*./app*  
The MVC components of the Oregon's Catch project.

*./jasmine-standalone*  
Unit testing resources. See above.

*./phonegap*  
Phonegap's app compilation resources. Custom splash screen is configured here instead of ./app.

*./resources*  
Compiled CSS, visual assets.

*./docs*  
Documentation resources. See above

*./siesta*  
Siesta UI tests and resources.

*./syntax*  
Javascript linting resources.

*./touch*  
Sencha Touch configuration and internal resources.

# Contributors To Date  
Michael Freeman  
Jacob Broderick  
Rob MacDonald  
Justin Carr
