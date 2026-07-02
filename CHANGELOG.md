# Changelog 

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.0.0 - 2026-07-02
### Added
- add `review` route ([fbd4684](https://github.com/antipotion/task-gate/commit/fbd4684))
- add url submission for task ([57c5587](https://github.com/antipotion/task-gate/commit/57c5587))
- add `review` feature and pipeline ([d352d06](https://github.com/antipotion/task-gate/commit/d352d06))
- add review resource UI ([5a7d9c3](https://github.com/antipotion/task-gate/commit/5a7d9c3))
- add back button to `review list` ([7e1b7d4](https://github.com/antipotion/task-gate/commit/7e1b7d4))
- add comment system on `review` ([119bd6f](https://github.com/antipotion/task-gate/commit/119bd6f))
- add author name, email, and license ([0ca9262](https://github.com/antipotion/task-gate/commit/0ca9262))
- add UI project-details card ([82f4749](https://github.com/antipotion/task-gate/commit/82f4749))
- add overdue task metric feature support ([4909ec1](https://github.com/antipotion/task-gate/commit/4909ec1))
- add `task-category` component ([a536eec](https://github.com/antipotion/task-gate/commit/a536eec))
- add truncation to project title name ([ab1e70d](https://github.com/antipotion/task-gate/commit/ab1e70d))
- add show discussion functionality ([fa57d27](https://github.com/antipotion/task-gate/commit/fa57d27))
- add DTO types ([320bc99](https://github.com/antipotion/task-gate/commit/320bc99))
- add date pipe to `comments` ([a42cb4a](https://github.com/antipotion/task-gate/commit/a42cb4a))
- add empty state for `project-task-category` ([9e17148](https://github.com/antipotion/task-gate/commit/9e17148))
- add reusable layout shell for mobile and tablet plus ([418bede](https://github.com/antipotion/task-gate/commit/418bede))
- add `teamName` to project model data ([1e99211](https://github.com/antipotion/task-gate/commit/1e99211))
- add title to `task-details` ([2b08a4d](https://github.com/antipotion/task-gate/commit/2b08a4d))
- add checkpoint for Angular v22 update ([6b50ce4](https://github.com/antipotion/task-gate/commit/6b50ce4))
- add checkpoint for Angular Material v22 update ([36aba87](https://github.com/antipotion/task-gate/commit/36aba87))
- add `team-detail` component ([03015c9](https://github.com/antipotion/task-gate/commit/03015c9))
- add null guard on both `login` and `sign-up` ([2f2a7a6](https://github.com/antipotion/task-gate/commit/2f2a7a6))
- add ripples to UI cards ([f6248fd](https://github.com/antipotion/task-gate/commit/f6248fd))
- add `memberList` for `create-task` ([608b4e0](https://github.com/antipotion/task-gate/commit/608b4e0))
- add state handling for `create-task` ([a65c4ee](https://github.com/antipotion/task-gate/commit/a65c4ee))
- add snackbar dismiss functionality for `project-detail-shell` ([2873cb5](https://github.com/antipotion/task-gate/commit/2873cb5))
- add success snackbar for `create-project` ([6a552ec](https://github.com/antipotion/task-gate/commit/6a552ec))
- add creator and assignee UI representation for `task-overview` ([434094c](https://github.com/antipotion/task-gate/commit/434094c))
- add success and error snackbar for `create-review` ([a5b7ae5](https://github.com/antipotion/task-gate/commit/a5b7ae5))
- add notification system ([736d747](https://github.com/antipotion/task-gate/commit/736d747))
- add notification for `create-review` ([de51959](https://github.com/antipotion/task-gate/commit/de51959))
- add notification for `comments` ([3635e00](https://github.com/antipotion/task-gate/commit/3635e00))
- add notification functionality for `mobile-shell` ([a5ecc7f](https://github.com/antipotion/task-gate/commit/a5ecc7f))
- add notification for review judgement ([a514395](https://github.com/antipotion/task-gate/commit/a514395))
- add permission model to the state-machine ([a3d469d](https://github.com/antipotion/task-gate/commit/a3d469d))
- add loading state when visiting notification ([821d40f](https://github.com/antipotion/task-gate/commit/821d40f))
- add `membersList` for `task-edit` ([791a834](https://github.com/antipotion/task-gate/commit/791a834))
- add loading state for notification click on `mobile-shell` ([5ce061f](https://github.com/antipotion/task-gate/commit/5ce061f))
- add `reviewId` as title for `review-hero` ([380d15e](https://github.com/antipotion/task-gate/commit/380d15e))
- add task delete & edit success and error snackbar for `task-details` ([b60eeec](https://github.com/antipotion/task-gate/commit/b60eeec))
- add gating for edit and delete functionality to project owner only ([ff332dd](https://github.com/antipotion/task-gate/commit/ff332dd))
- add edit & delete success and error states for `project-details` ([c4d396e](https://github.com/antipotion/task-gate/commit/c4d396e)) 
- add loading state for task deletion on `task-details` ([5253025](https://github.com/antipotion/task-gate/commit/5253025))
- add loading states for `project-dashboard` ([491510e](https://github.com/antipotion/task-gate/commit/491510e))
- add gating for `addTask` to the project owner on `project-detail-shell` ([c25f255](https://github.com/antipotion/task-gate/commit/c25f255))
- add loading states for team owner and members on `team-detail` ([0ea1269](https://github.com/antipotion/task-gate/commit/0ea1269))
- add about section ([6d95d22](https://github.com/antipotion/task-gate/commit/6d95d22))
- add logo to UI ([400b01c](https://github.com/antipotion/task-gate/commit/400b01c))

### Changed
- redesign of the UI ([876b717](https://github.com/antipotion/task-gate/commit/876b717))
- change implementation for task query `listenToTask$` ([a9d7cf1](https://github.com/antipotion/task-gate/commit/a9d7cf1))
- redesign UI for `task-board` ([6d7aac5](https://github.com/antipotion/task-gate/commit/6d7aac5))
- change UI design for `task-header` ([b130a0b](https://github.com/antipotion/task-gate/commit/b130a0b))
- change UI design for `task-overview` ([1c47f22](https://github.com/antipotion/task-gate/commit/1c47f22))
- change implementation for `review-list` ([d25fe0a](https://github.com/antipotion/task-gate/commit/d25fe0a))
- change UI design for `review-hero` ([bfbe773](https://github.com/antipotion/task-gate/commit/bfbe773))
- change UI design for `review-resource` ([1505c5c](https://github.com/antipotion/task-gate/commit/1505c5c))
- change UI design for `review-detail` ([0e813b8](https://github.com/antipotion/task-gate/commit/0e813b8))
- update data for `footer` & `banner` ([a1722a8](https://github.com/antipotion/task-gate/commit/a1722a8))
- change UI design for `comments` ([edce9a2](https://github.com/antipotion/task-gate/commit/edce9a2))
- change implementation for `project-status` ([2bb5e48](https://github.com/antipotion/task-gate/commit/2bb5e48))
- change UI design for `task-review-list` ([35e8318](https://github.com/antipotion/task-gate/commit/35e8318))
- adjust spacing and settings for mobile and tablet layout shell ([18b64b8](https://github.com/antipotion/task-gate/commit/18b64b8))
- update implementation of pipelines and checkpoint for refactor ([339de5f](https://github.com/antipotion/task-gate/commit/339de5f))
- bug fix and change UI implementation ([4e727c7](https://github.com/antipotion/task-gate/commit/4e727c7))
- centralize `router-outlet` ([1b63084](https://github.com/antipotion/task-gate/commit/1b63084))
- change `project-detail` UI design ([6834d7e](https://github.com/antipotion/task-gate/commit/6834d7e))
- change `task-detail-workspace` UI design ([106849e](https://github.com/antipotion/task-gate/commit/106849e))
- change `review-workspace` UI design ([1acccf0](https://github.com/antipotion/task-gate/commit/1acccf0))
- successful upgrade to Angular v22 and dependencies update ([ab19358](https://github.com/antipotion/task-gate/commit/ab19358))
- change `team-workspace` UI design ([4886bbf](https://github.com/antipotion/task-gate/commit/4886bbf))
- update `create-team` and `join-team` for their input field to be full-width ([1b237d8](https://github.com/antipotion/task-gate/commit/1b237d8))
- move files to dedicated folders - cleanup ([e30f8c6](https://github.com/antipotion/task-gate/commit/e30f8c6))
- change padding for `tablet-shell` ([71537a0](https://github.com/antipotion/task-gate/commit/71537a0))
- clean up for `active-task` pipeline ([521aca1](https://github.com/antipotion/task-gate/commit/521aca1))
- change loading UI for `team-detail` ([8f409cb](https://github.com/antipotion/task-gate/commit/8f409cb))
- hide `deadlinePressure` for completed projects ([ea88073](https://github.com/antipotion/task-gate/commit/ea88073))

### Removed
- remove `submitted` state in `task-state-machine` ([b4ec7df](https://github.com/antipotion/task-gate/commit/b4ec7df))
- remove `project-activity-feed` since it won't be implemented in the near-future ([422c44d](https://github.com/antipotion/task-gate/commit/422c44d))
- remove menu for `task-details` ([1197054](https://github.com/antipotion/task-gate/commit/1197054))
- remove eager change detection from Angular v22 migration update ([4f62aff](https://github.com/antipotion/task-gate/commit/4f62aff))
- remove rxjs filter from `taskReviews` on `review-store` ([584ac74](https://github.com/antipotion/task-gate/commit/584ac74))
- remove rxjs filter from `tasks` on `store-service` ([555265c](https://github.com/antipotion/task-gate/commit/555265c))

### Fixed
- fix project status ([fc22185](https://github.com/antipotion/task-gate/commit/fc22185))
- fix `task-details` pipeline ([3943901](https://github.com/antipotion/task-gate/commit/3943901))
- fix `review-detail` pipeline to be work again ([a0df82e](https://github.com/antipotion/task-gate/commit/a0df82e))
- fix login issue ([2c79339](https://github.com/antipotion/task-gate/commit/2c79339))
- fix `sign-up` route ([3c01d6e](https://github.com/antipotion/task-gate/commit/3c01d6e))
- fix login issue with long lived states ([0cd2a6e](https://github.com/antipotion/task-gate/commit/0cd2a6e))
- fix typo for `review-resource` ([6eb5fe8](https://github.com/antipotion/task-gate/commit/6eb5fe8))
- fix issue for `task-facade` where no `active-task` present ([8ffe5c7](https://github.com/antipotion/task-gate/commit/8ffe5c7))
- fix subscription to end gracefully ([4115eb4](https://github.com/antipotion/task-gate/commit/4115eb4))

## v0.3.0-alpha - 2026-06-05
### Added
- Footer component ([10f6597](https://github.com/antipotion/task-gate/commit/10f6597))
- Loading state for screen transitions ([aa81365](https://github.com/antipotion/task-gate/commit/aa81365))
- Start date input for `edit-task` ([b551777](https://github.com/antipotion/task-gate/commit/b551777))

### Changed
- Footer icon color ([5281920](https://github.com/antipotion/task-gate/commit/5281920))
- Adjust styles for footer ([cc52721](https://github.com/antipotion/task-gate/commit/cc52721))

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
