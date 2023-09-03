# Prettier vscode plugin configuration

The purpose of the `prettier vscode plugin` is integration prettier with vscode environment.

## Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [License](#license)

## Prerequisites

- [➡ prettier](../../packages/prettier/README.md) - linting and formatting indexed files before commit.

## Setup

- Install vs code `prettier` plugin by using Quick Open (`Ctrl` + `P`) and running the following command:

  ```sh
  ext install esbenp.vscode-prettier
  ```

- Configure vs code `prettier` plugin, by adding following settings:

  ```jsonc
  // .vscode/settings.json

  {
    ...
    "files.eol": "\n", // for consistent line ending across different systems.

    "prettier.requireConfig": true,
    ...
  }
  ```

## Usage

- **Automatic** formatting file with `prettier` on save.

## License

[MIT](../../LICENSE) © [Artem Shchirov](https://github.com/artemshchirov)

---

[⬅ Back](../../README.md)

---
