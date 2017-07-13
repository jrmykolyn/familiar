# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Added [ESLint](http://eslint.org/) to `devDependencies`. Contents of `./lib/` dir. can be linted by running `npm run lint`.
- Added `package-lock.json` file to repo.

### Changed
- ...

## [0.1.0] - 2017-05-15
### Added
- Added `familiar init`/`familiar summon` commands. Both commands are used to quickly create a new `familiar.config.js` file at the current working directory.
- Added `.familiarrc` file to `config/` directory.
- Added `familiar init-global` command. Command used to create a new `.familiarrc` file in the user's home directory.
- Added `lib/setup`, `lib/main`, and `lib/utils` directories.

### Changed
- Updated `familiar -v` and `familiar --version` commands to correctly log out the package version.
- Moved `Familiar` commands (`familiar.js`) into `lib/familiar/commands/`.
- Moved `gitf` commands (`familiar.js`) into `lib/gitf/commands/`.
- Moved side effects into dedicated `lib/setup`.
- Moved `execP` into `lib/utils`.
- Moved `main.js` into `lib/main`.

## [0.0.13] - 2017-03-22
### Added
- Added 'CHANGELOG.md' to project.

### Changed
- Updated `gitf commit` to log/print `stdout`.
