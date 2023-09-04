# Shared typescript configuration

The purpose of the [typescript](https://www.typescriptlang.org/) is to add strong typing to `javascript`.

> This configuration targets **lib react** packages.

---

## Contents

- [Setup](#setup)

## Setup

- Add workspace reference to `@artemshchirov/configs-ts-react` and its peers dependencies:

  ```sh
  pnpm add -w @artemshchirov/configs-ts-react typescript react react-dom @types/node @types/react @types/react-dom
  ```

- Add typescript configuration file

  ```jsonc
  // packages/bar/tsconfig.json

  {
    "extends": "@artemshchirov/configs-ts-react",
    "compilerOptions": {
      "baseUrl": "src",
      "rootDir": "src"
    },
    "include": ["src"]
  }
  ```
