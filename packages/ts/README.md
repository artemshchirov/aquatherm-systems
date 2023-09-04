# Shared typescript configuration

The purpose of the [typescript](https://www.typescriptlang.org/) is to add strong typing to `javascript`.

> This configuration targets **lib typescript** packages.

---

## Contents

- [Setup](#setup)

## Setup

- Add workspace reference to `@artemshchirov/configs-ts` and its peers dependencies:

  ```sh
  pnpm add -w @artemshchirov/configs-ts typescript @types/node
  ```

- Add typescript configuration file

  ```jsonc
  // packages/baz/tsconfig.json

  {
    "extends": "@artemshchirov/configs-ts",
    "compilerOptions": {
      "baseUrl": "src",
      "rootDir": "src"
    },
    "include": ["src"]
  }
  ```
