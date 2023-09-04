# Changesets configuration

The purpose of the **[changesets ↗](https://github.com/changesets/changesets)** is management of versioning and changelogs with a focus on multi-package repositories.

## Contents

- [Setup](#setup)
- [Usage](#usage)

## Setup

- Add workspace reference to `@changesets/cli`:

  ```sh
  pnpm add -w @changesets/cli
  ```

- Initialize changesets:

  ```sh
  pnpm changeset init
  ```

## Usage

- Add changeset entries

  ```sh
  # Add temporary changeset entries in .changesets folder.
  # Entries can be safely committed until release.
  pnpm changeset add
  ```

- Prerelease

  ```sh
  # Transform temporary changeset entries into
  # corresponded packages versions and changelogs.
  pnpm changeset version
  ```

- Release

  ```sh
  # Review and commit package versions and changelogs
  git add .
  git commit -m "chore: release"
  ```

- Publish (automatic)

  ```sh
  # Publish all changed packages and add version tags to current git commit
  pnpm changeset publish
  ```

- Publish (manual)

  ```sh
  # Publish packages
  pnpm publish --access=public

  # Add version tags to current git commit
  pnpm changeset tag
  ```

- Push version tags

  ```sh
  # Review and push created version tags:
  git push --follow-tags
  ```

---

[⬅ Back](../../README.md)

---
