# Shared remark configuration

The purpose of the `remark` is linting, formatting and autogenerate contents of markdown files (.md).

---

## Contents

- [Setup](#setup)
- [Automation](#automation)
- [Usage](#usage)
- [Donation](#donation)
- [License](#license)

## Setup

- Add workspace reference to `@artemshchirov/configs-remark` and its peer dependencies:

  ```sh
  pnpm add -w @artemshchirov/configs-remark remark remark-cli
  ```

- Add remark configuration file:

  ```js
  // .remarkrc.mjs

  export { default } from '@artemshchirov/configs-remark';
  ```

- Add remark ignore patterns file:

  ```sh
  # .remarkignore

  node_modules/

  # Next ignore patterns
  .next/
  .build/
  .coverage/

  # Custom ignore patterns
  ...
  ```

- Add remark scripts:

  ```jsonc
  // package.json

  "scripts": {
    ...
    "remark": "remark",
    "remark:fix": "pnpm remark --output --"
    ...
  }
  ```

## Automation

- Setup [➡ remark vscode plugin](../../docs/plugins/vscode-remark.md) to integrate `remark` with vscode environment.

## Usage

- **Automatic** validation file with `remark` on save.
- **Automatic** validation of staged files with `remark` on commit.
- Manual usage from command line:

  ```sh
  pnpm remark .
  pnpm remark:fix .
  ```
