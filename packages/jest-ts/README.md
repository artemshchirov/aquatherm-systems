# Shared jest configuration

The purpose of the [jest](https://jestjs.io/) is to test `javascript`.

> This configuration targets **lib typescript** packages.

---

## Contents

- [Setup](#setup)

## Setup

- Add workspace reference to `@artemshchirov/configs-jest-ts` and its peers dependencies:

  ```sh
  pnpm add -w @artemshchirov/configs-jest-ts jest ts-jest @types/jest
  ```

- Add jest configuration file

  ```js
  // packages/baz/jest.config.js

  module.exports = require('@artemshchirov/configs-jest-ts');
  ```
