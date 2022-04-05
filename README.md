# Mable 

## Author
Jordan Estorba

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Installation

1. (Optional) Install Node Version Manager (NVM)

This is not required, but a highly recommended step.

NVM is a great tool that allows you to run up multiple Node.js environments and switch between them easily.

You can follow the steps here to setup: [NVM](https://github.com/nvm-sh/nvm#installation-and-update)

2. Install Node.js

```console
nvm install --lts
```

If you are not using NVM, install the LTS version from [Node.js](https://nodejs.org/en/)

3. Install Angular CLI

We’ll need to install Angular’s command line interface 

> -g stands for global installation. If you use -g later you can use the CLI in any Angular project on your computer.

```console
npm install -g @angular/cli
```

## Running Locally

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).



## Future Improvements / Additions
 * [Add] ObservabilityService - This is responsible for capturing metrics and forwarding it to any monitoring tool such as Datadog or GA
 * [Improvement] Improvement on the UI design including animation. 
 * [Code_Debt] Add unit tests on components and services
 * [Improvement] Add toggle feature on Node children. This will require new accessibility tags such as aria-expanded 
 * [Improvement] Refactor components
    * NodeCtaComponent > Shared component for providing emits call to action event to parent components
    * NodeCreateComponent > Shared component that is responsible for capturing the name of the new NodeModel. This component will 
