# @diageo/northamerica_com

## 15.10.1

### Patch Changes

- 5c71ca6: Updated our buildsystem so we get:

  - Treeshakable packages
  - Included CSS, no need for a big styles.css file anymore
  - Automatic generation of barrel files with `pnpm generate:barrels`
  - Seperated buildsystem package for utilities related to tooling
  - Updated TSConfigs to support the new buildsystem

- Updated dependencies [5c71ca6]
- Updated dependencies [5c71ca6]
  - @diageo/designsystem@5.0.0
  - @diageo/utils@5.0.0

## 15.10.0

### Minor Changes

- d656a0f: Updated CI pipelines with new packages

## 15.9.0

### Minor Changes

- 7c09d91: Play button align Liquid Magic Header block

## 15.8.0

### Minor Changes

- a274cfc: Upgrade jQuery version from PEN test feedback

## 15.7.0

### Minor Changes

- 277e749: Render map POI label side-to-side on larger screens

### Patch Changes

- Updated dependencies [277e749]
  - @diageo/designsystem@4.2.0

## 15.6.0

### Minor Changes

- ea10f64: Handle robots.txt in a dynamic way with envvars

## 15.5.0

### Minor Changes

- 4a004e7: Use video player component in order to utilize single-source-of-truth

## 15.4.0

### Minor Changes

- a7ac6fc: added postinstall script to the monorepo that runs build after install

### Patch Changes

- Updated dependencies [a7ac6fc]
  - @diageo/designsystem@4.1.0
  - @diageo/utils@4.1.0

## 15.3.0

### Minor Changes

- 3464bfd: Fix latest stories block use CMS richtext

## 15.2.0

### Minor Changes

- 4cc55ab: Add target to brandsliderblock

## 15.1.0

### Minor Changes

- f9eb141: Add enablejsapi for Youtube player in order to get working with Media Monks analytics

## 15.0.0

### Major Changes

- 2a5eae8: Render corporate components as Figma

## 14.0.0

### Major Changes

- 89b4b46: Accessibility updates

### Minor Changes

- 89b4b46: Fix siteimprove accessibility issues

### Patch Changes

- Updated dependencies [89b4b46]
- Updated dependencies [89b4b46]
  - @diageo/designsystem@4.0.0

## 13.2.2

### Patch Changes

- 9d43a43: fixed mainmenu z-index

## 13.2.1

### Patch Changes

- e5234b4: fixed a11y issues on the poi map
- e5234b4: fixed a11y issues for the map with states only
- Updated dependencies [e5234b4]
- Updated dependencies [e5234b4]
- Updated dependencies [e5234b4]
- Updated dependencies [e5234b4]
  - @diageo/designsystem@3.5.0

## 13.2.0

### Minor Changes

- d66bc1e: Fix siteimprove accessibility issues

### Patch Changes

- Updated dependencies [d66bc1e]
  - @diageo/designsystem@3.4.0

## 13.1.0

### Minor Changes

- f7ce424: Made Headline component full width

### Patch Changes

- Updated dependencies [f7ce424]
  - @diageo/designsystem@3.3.0

## 13.0.0

### Major Changes

- d3efc66: Added PostCSS and plugins so we get SCSS like functionalities in css modules

### Minor Changes

- d3efc66: Refactored logoblock so it uses the LogoBlock component from the design library

### Patch Changes

- Updated dependencies [d3efc66]
  - @diageo/designsystem@3.2.0

## 12.6.1

### Patch Changes

- 834a9af: moved git ignore files and added uat and staging build scripts

## 12.6.0

### Minor Changes

- c42a629: Added Graphic Cards component

### Patch Changes

- Updated dependencies [c42a629]
  - @diageo/designsystem@3.1.0

## 12.5.0

### Minor Changes

- 5f9c5ea: Fix xo config file

## 12.4.0

### Minor Changes

- e3f2588: Render column content block with no link correctly

## 12.3.0

### Minor Changes

- 7ae2775: Revert pipelines error from https://dev.azure.com/comprend/Diageo%20Platform/_git/platform/pullrequest/3076

## 12.2.0

### Minor Changes

- dc4fe69: Update column content block to render without an link

## 12.1.13

### Patch Changes

- Updated dependencies [714885d]
  - @diageo/designsystem@3.0.10
  - @diageo/utils@4.0.5

## 12.1.12

### Patch Changes

- d534561: Added default state to both maps on diageonorthamerica.com
- Updated dependencies [d534561]
  - @diageo/designsystem@3.0.9
  - @diageo/utils@4.0.4

## 12.1.11

### Patch Changes

- b3ba55f: Updated map colors, active is now white and inactive has a tiny opacity.
- Updated dependencies [b3ba55f]
  - @diageo/designsystem@3.0.8

## 12.1.10

### Patch Changes

- 87f88da: Added headings to maps

## 12.1.9

### Patch Changes

- 7a95633: Joel is an idiot.

## 12.1.8

### Patch Changes

- c9030f6: Fixed typo in 404

## 12.1.7

### Patch Changes

- Updated dependencies [20e7874]
  - @diageo/designsystem@3.0.7

## 12.1.6

### Patch Changes

- Updated dependencies [8fa470f]
  - @diageo/designsystem@3.0.6

## 12.1.5

### Patch Changes

- b4e427b: changed tag handling in pipeline
- Updated dependencies [b4e427b]
  - @diageo/designsystem@3.0.5
  - @diageo/utils@4.0.4

## 12.1.4

### Patch Changes

- 66435b6: added designsystem provider to 404 page

## 12.1.3

### Patch Changes

- fcfb560: Added build service as contributor to NPM feeds
- Updated dependencies [fcfb560]
  - @diageo/designsystem@3.0.4
  - @diageo/utils@4.0.3

## 12.1.2

### Patch Changes

- 0912174: added NPM auth to pipes
- Updated dependencies [0912174]
  - @diageo/designsystem@3.0.3
  - @diageo/utils@4.0.2

## 12.1.1

### Patch Changes

- 859eb65: Updated project readme with new instructions for how to release
- Updated dependencies [859eb65]
  - @diageo/designsystem@3.0.2
  - @diageo/utils@4.0.1

## 12.1.0

### Minor Changes

- Updated position of maps

### Patch Changes

- Updated dependencies
  - @diageo/designsystem@3.0.1

## 12.0.1

### Patch Changes

- changed dockerfile to not use workspace packages

## 12.0.0

### Major Changes

- Maps and carousel is in with inital versions

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @diageo/utils@4.0.0
  - @diageo/designsystem@3.0.0

## 11.0.0

### Major Changes

- Updating all packages since there has been lots of development on the entire codebase

### Patch Changes

- Updated dependencies
  - @diageo/designsystem@2.0.0

## 10.1.1

### Patch Changes

- Updated dependencies
  - @diageo/designsystem@1.1.0

## 10.1.0

### Minor Changes

- fix(carousel-cards): Causing pipline issues

## 9.0.0

### Major Changes

- no worries

### Patch Changes

- Updated dependencies
  - @diageo/designsystem@1.0.0

## 8.0.3

### Patch Changes

- 941b01e: working on changesets
- Updated dependencies [941b01e]
  - @diageo/designsystem@0.0.2

## 8.0.2

### Patch Changes

- 0b2b818: testing again
- 4bd9ac7: testing pipelines

## 8.0.2

### Patch Changes

- bcd0f77: testing

## 8.0.1

### Patch Changes

- a228739: updated pipeline

## 8.0.0

### Major Changes

- 10450c3: creating new version to test pipeline

### Patch Changes

- Updated dependencies [1fb3239]
  - @diageo/designsystem@1.0.0
