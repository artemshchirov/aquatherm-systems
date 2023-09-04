# Shared jest configuration

The purpose of the [jest](https://jestjs.io/) is to test `javascript`.

> This configuration targets **lib react** packages.

---

## Contents

- [Setup](#setup)

## Setup

- Add workspace reference to `@artemshchirov/configs-jest-ts-react` and its peers dependencies:

  ```sh
  pnpm add -w @artemshchirov/configs-jest-ts-react jest ts-jest jest-environment-jsdom @testing-library/react
  ```

- Add jest configuration file

  ```js
  // packages/bar/jest.config.js

  module.exports = require('@artemshchirov/configs-jest-ts-react');
  ```
