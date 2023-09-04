# Shared typescript configuration

The purpose of the [typescript](https://www.typescriptlang.org/) is to add strong typing to `javascript`.

> This configuration targets **app next** packages.

---

## Contents

- [Setup](#setup)

## Setup

- Add workspace reference to `@artemshchirov/configs-ts-next` and its peers dependencies:

  ```sh
  pnpm add -w @artemshchirov/configs-ts-next typescript react react-dom @types/node @types/react @types/react-dom
  ```

- Add typescript configuration file

  ```jsonc
  // apps/foo/tsconfig.json

  {
    "extends": "@artemshchirov/configs-ts-next",
    "compilerOptions": {
      "baseUrl": "src",
      "rootDir": "src"
    },
    "include": ["next-env.d.ts", "src"]
  }
  ```

- Turn **on** `next` externalDir experimental function:

  ```js
  // apps/foo/next.config.js

  {
    ...
    "experimental": {
      "externalDir": true //< for workspaces
    }
    ...
  }
  ```
