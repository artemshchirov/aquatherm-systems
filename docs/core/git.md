# Git configuration

The purpose of the **[git ↗](https://git-scm.com/)** is handling version control.

## Contents

- [Setup](#setup)
- [License](#license)

## Setup

- Create git repo

  ```sh
  git init
  ```

- Add git ignore file:

  ```sh
  # .gitignore

  node_modules/

    # Next ignore patterns
  .next/
  .build/
  .coverage/

  # Custom ignore patterns
  ...
  ```

- Add git attributes file:

  ```sh
  # .gitattributes

  **/pnpm-lock.yaml -diff
  ```

## License

[MIT](../../LICENSE) © [Artem Shchirov](https://github.com/artemshchirov)

---

[⬅ Back](../../README.md)

---
