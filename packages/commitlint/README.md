# Shared commitlint configuration

The purpose of the `commitlint` is linting of a commit message to conform the following format:

```js
type(scope?): subject
```

---

## Contents

- [Setup](#setup)
- [Automation](#automation)
- [Usage](#usage)
- [Donation](#donation)
- [License](#license)

## Setup

- Add workspace reference to `@artemshchirov/configs-commitlint` and its peer dependencies:

  ```sh
  pnpm add -w @artemshchirov/configs-commitlint @commitlint/cli
  ```

- Add commitlint configuration file:

  ```js
  // .commitlintrc.js

  module.exports = require('@artemshchirov/configs-commitlint');
  ```

- Add commitlint scripts:

  ```jsonc
  // package.json

  "scripts": {
    ...
    "commitlint": "commitlint"
    ...
  }
  ```

## Automation

- Setup [➡ husky](../../docs/tools/husky.md) to schedule `commitlint` execution on commit.

## Usage

- **Automatic** validation of commit message with `commitlint` on commit.\
  In case of invalid message, commit will be rejected.
