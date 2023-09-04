# Shared syncpack configuration

The purpose of the [syncpack](https://www.npmjs.com/package/syncpack) is formatting package json and validating dependencies versions.

---

## Contents

- [Setup](#setup)
- [Usage](#usage)

## Setup

- Add workspace reference to `@artemshchirov/configs-syncpack` and its peer dependencies:

  ```sh
  pnpm add -w @artemshchirov/configs-syncpack syncpack
  ```

- Add syncpack configuration file:

  ```js
  // .syncpackrc.js

  module.exports = require('@artemshchirov/configs-syncpack');
  ```

- Add syncpack scripts:

  ```jsonc
  // package.json

  "scripts": {
    ...
    "syncpack:fix": "syncpack format && syncpack fix-mismatches"
    ...
  }
  ```

## Usage

- Manual usage from command line:

  ```sh
  pnpm format:check .
  pnpm format:fix .
  ```
