# Changelog 

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v0.2.0-alpha - 2026-06-03
### Added
- Working reactive project status ([4af3bc2](https://github.com/antipotion/task-gate/commit/4af3bc2))
- Deadline pressure feature to project ([7e644ce](https://github.com/antipotion/task-gate/commit/7e644ce))
- Custom history stack for back functionality ([7891a25](https://github.com/antipotion/task-gate/commit/7891a25))
- Route guards ([efe1d2f](https://github.com/antipotion/task-gate/commit/efe1d2f))
- Join team and leave team functionality added with UI representation ([8faf64a](https://github.com/antipotion/task-gate/commit/8faf64a))
- `userFullName` functionality ([2dfd370](https://github.com/antipotion/task-gate/commit/2dfd370))
- Task start date input on `create-task` ([375e18c](https://github.com/antipotion/task-gate/commit/375e18c))
- Task Status to `task-header` ([2d568d5](https://github.com/antipotion/task-gate/commit/2d568d5))
- File input and conditional button display for `task-status` (now `task-action`) ([acb41b9](https://github.com/antipotion/task-gate/commit/acb41b9))
- Disclaimer dialog ([6c29906](https://github.com/antipotion/task-gate/commit/6c29906))

### Changed
- `startDate` and `deadline` in project is now optional ([69f6348](https://github.com/antipotion/task-gate/commit/69f6348))
- `UserModel` now has `firstName` and `lastName` fields ([1b2e03e](https://github.com/antipotion/task-gate/commit/1b2e03e))
- Project and Team now has back functionality ([ae8335e](https://github.com/antipotion/task-gate/commit/ae8335e))
- type `string` is now `Date` for `TaskModel` ([b9c1ca2](https://github.com/antipotion/task-gate/commit/b9c1ca2))
- Transfer team functionality from `AuthUsecase` to `TeamUsecase` ([689c9d9](https://github.com/antipotion/task-gate/commit/689c9d9))
- Replace manual brute force style override for angular material button's error state ([02d3a39](https://github.com/antipotion/task-gate/commit/02d3a39))
- Rename `task-status` to `task-action` ([a7b0896](https://github.com/antipotion/task-gate/commit/a7b0896))

### Fixed
- Fix `create-project` UI button on medium screen ([4fb7ed7](https://github.com/antipotion/task-gate/commit/4fb7ed7))
- Login loading state UI now appears on login ([9dab941](https://github.com/antipotion/task-gate/commit/9dab941))
- Fix `mat-datepicker` to the appropriate input field on `create-project` ([03f90fd](https://github.com/antipotion/task-gate/commit/03f90fd))

## v0.1.1-alpha - 2026-05-27
### Added
- Version banner
- Changelog

## v0.1.0-alpha - 2026-05-26
### Added
- Initial release.
- Firebase Hosting deployment.
- CI/CD Github Actions pipeline.
- Angular v21 application structure.

