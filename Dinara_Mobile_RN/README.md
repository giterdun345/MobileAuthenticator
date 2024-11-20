<h6 align="center">Dinara Mobile Authenticator</h6>

## Introduction

## Table of contents

- 🏃[Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run ios](#npm-run-ios)
  - [npm run android](#npm-run-android)
  - [npm run startClean](#npm-run-startClean)
- [🗺 Project Layout](#project-layout)
- [📚 Documentation](#documentation)

## Available Scripts

NPM was used to install dependencies.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io), more below for use on your own phone. It will reload immediately if you save edits to your files, and you will see build errors and logs in the terminal not on the phone.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, use `npm run startClean` or

```
npm start --reset-cache
```

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed. Using [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). Make sure to have your phone in dev mode and the USB Debugger on. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

#### `npm run startClean`

Cleans expo cache and starts to open your app with a clean bundle. Will have a warning that this will take a few minutes.

##### Using Android Studio's `adb`

Make sure that you can run adb from your terminal. `adb devices` will show the active current devices (devices plugged in or virtual machines in emulator when running). More info here on [setting up adb path on Windows](https://theflutterist.medium.com/setting-up-adb-path-on-windows-android-tips-5b5cdaa9084b) or

Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

## Project Layout

Project uses Expo Router which is a stack based navigation approach. Each new route gets added to the stack. You can use `router.replace` to not add a route to the stack or `router.push` to add a route to the stack and give back button functionality. Think of it as same routing for a browser window.

The project uses file-based routing where every file within `app` becomes a route in the navigation. Other subFolders in `app` are set up to group routes with some quirky naming.

### Directory

`index.tsx` is the root page of the app and redirects user if onboarding has not taken place or provides a list of pending approvals, an error message should an error occur or loading screen during the fetch of the pending approvals.

`_layout.tsx` the layout page, by convention, is named to wrap every page in the app. Options can be used with the Stack component to display or hide components, i.e. header image or settings button.

`start-configuration.tsx` is the initial page a new user will be taken to during onboarding where the bar code scanner is used to obtain user information. Once user information is acquired, user navigates to the `(OnboardingFlow)` group.

`(OnboardingFlow)` named by convention to provide a group to organize the onboarding section of the app. The parenthesis wrapped on the directory name allows you to route to the `OnboardingScreen` with out the OnboardingFlow segment in the URL used.

`assets` The assets folder contains adaptive-icon.png used for Android and an icon.png used for iOS as an app icon. It also contains splash.png which is an image for the project's splash screen and a favicon.png if the app runs in a browser.

`app.json` The app.json file contains [configuration options](https://docs.expo.dev/versions/latest/config/app/) for the project. These options change the behavior of your project while developing, in addition to while building, submitting, and updating our app.

### Customizing App Display Name and Icon

You can edit `app.json` to include [configuration keys](https://docs.expo.io/versions/latest/guides/configuration.html) under the `expo` key.

To change your app's display name, set the `expo.name` key in `app.json` to an appropriate string.

To set an app icon, set the `expo.icon` key in `app.json` to be either a local path or a URL. It's recommended that you use a 512x512 png file with transparency.

<p text-align="center">
  <a aria-label="expo documentation" href="https://docs.expo.dev">Read the Documentation</a>
&ensp;•&ensp;
   <a aria-label="Follow @expo on GitHub" href="https://github.com/expo" target="_blank">
    <img alt="Expo on GitHub" src="https://img.shields.io/badge/GitHub-222222?style=for-the-badge&logo=github&logoColor=white" target="_blank" />
  </a>&nbsp;
 </p>

<div id='documentation'></div>

## Documentation

### &nbsp;&nbsp; Environment

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For Windows

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Android

1. Install the latest version of Node.js (even numbered) I use nvm for the native modules but the latest will work fine for running and building (16 or above). `choco install -y nodejs`
2. This runs on ExpoSDK of 50, JDK version 17 is required.
3. Install Android Studio; guide [here](https://docs.expo.dev/workflow/android-studio-emulator/)

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; IOS

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Not gonna happen

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For MacOs

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Android

1. Using a package manager such as homebrew:1. Make sure you have JDK 17. To install `brew tap homebrew/cask-versions` `brew install --cask zulu17`; After you install the JDK, add the JAVA_HOME environment variable in ~/.bash_profile (or ~/.zshrc if you use Zsh): `export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`
2. Install the latest version of Node.js (even numbered) I use nvm for the native modules but the latest will work fine for running and building (16 or above).
3. Install Android Studio; guide [here](https://docs.expo.dev/workflow/android-studio-emulator/)

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; IOS

1. use package manager such as [Homebrew](https://brew.sh/)
2. Install watchman `brew install watchman`
3. Install XCode and [command line tools](https://docs.expo.dev/workflow/ios-simulator/#install-xcode-command-line-tools)
4. Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html); You can install using the version of Ruby that ships with the latest macOS version.

### Running locally

When first running the app locally, naviagte to the root folder and npm install the dependencies for the react application. If npm does not work on your system, delete the package-lock.json, if present and use yarn(v1).  
For other issues use the [troubleshooting link here](https://docs.expo.dev/workflow/common-development-errors/).

Terminal commands:

- `npx expo run:android`
- `npx expo run:ios`
  <br/>
  The commands will compile the project into a debug build of the app. They both run npx prebuild for the native directories (android and ios) and create them if they do not exist yet. You can also add the --device flag to select a device to run the app on — you can select a physically connected device or emulator/simulator.
  You can pass in --variant release (Android) or --configuration Release (iOS) to build a production version of your app.
  To modify your project's configuration or native code after the first build, you will have to rebuild your project. Running npx expo prebuild again layers the changes on top of existing files. It may also produce different results after the build.

To avoid this, add native directories to the project's .gitignore and use npx expo prebuild --clean command. This ensures that the project is always managed, and the --clean flag will delete existing directories before regenerating them. You can use app config or create a config plugin to modify your project's configuration or code inside the native directories.
[See more about compiling](https://docs.expo.dev/more/expo-cli/#compiling)

### Development Builds

---- TODO ----

Development builds give you full control over native runtime, this is where native code can be installed or any modifications made. These builds do not use the sandbox provided by Expo Go.
The `expo-dev-client` package replaces the default development tools UI of React Native. The launcher UI makes it possible to switch between development servers without needing to rebuild the app binary. This works great alongside [Continuous Native Generation (CNG)](https://docs.expo.dev/workflow/continuous-native-generation/) because you can generate a single development build whenever you modify the native code in your app, and then you can iterate on the JavaScript code without needing to rebuild the native code until the next time that you need to modify it.

The first time you run the `eas build` command, it creates an `eas.json` file at the root of your project directory. The eas.json includes three default build profiles — development, preview, and production. If you have removed the development profile since you first initialized eas.json, you should add it back now.

- [Build for device](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-the-device)

Here are the steps for a local build:

1. Run npx expo install expo-dev-client on the root directory. To create a development build, you can use local app compilation commands (npx expo run:[android|ios]) which will create a debug build and start the development server.

### Production Builds

---- TODO ----

- [Production Builds](https://egghead.io/courses/build-and-deploy-react-native-apps-with-expo-eas-85ab521e)
