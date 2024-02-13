# @diageo/designsystem

## 5.0.0

### Major Changes

- 5c71ca6: Updated our buildsystem so we get:

  - Treeshakable packages
  - Included CSS, no need for a big styles.css file anymore
  - Automatic generation of barrel files with `pnpm generate:barrels`
  - Seperated buildsystem package for utilities related to tooling
  - Updated TSConfigs to support the new buildsystem

### Patch Changes

- 5c71ca6: Minor updates to package files
- Updated dependencies [5c71ca6]
  - @diageo/utils@5.0.0

## 4.2.0

### Minor Changes

- 277e749: Render map POI label side-to-side on larger screens

## 4.1.0

### Minor Changes

- a7ac6fc: added postinstall script to the monorepo that runs build after install

### Patch Changes

- Updated dependencies [a7ac6fc]
  - @diageo/utils@4.1.0

## 4.0.0

### Major Changes

- 89b4b46: Accessibility updates

### Minor Changes

- 89b4b46: Fix siteimprove accessibility issues

## 3.5.0

### Minor Changes

- e5234b4: added useId() to the states component so each map gets unique IDs if there are multiple maps on one page

### Patch Changes

- e5234b4: Fixed lineheight on StateInfo disclaimers
- e5234b4: changed stateinfo state boxes to adhere to flex rules. when possible the stats are now stacked horizontally
- e5234b4: Added lineheight to Stat values

## 3.4.0

### Minor Changes

- d66bc1e: Fix siteimprove accessibility issues

## 3.3.0

### Minor Changes

- f7ce424: Made Headline component full width

## 3.2.0

### Minor Changes

- d3efc66: Added new LogoBlock component

## 3.1.0

### Minor Changes

- c42a629: Added Graphic Cards component

## 3.0.10

### Patch Changes

- 714885d: added stylelint ignore
- Updated dependencies [714885d]
  - @diageo/utils@4.0.5

## 3.0.9

### Patch Changes

- d534561: Added default state to both maps on diageonorthamerica.com
  - @diageo/utils@4.0.4

## 3.0.8

### Patch Changes

- b3ba55f: Updated map colors, active is now white and inactive has a tiny opacity.

## 3.0.7

### Patch Changes

- 20e7874: Changed so everyhting happens in one go

## 3.0.6

### Patch Changes

- 8fa470f: Mucking about

## 3.0.5

### Patch Changes

- b4e427b: changed tag handling in pipeline
- Updated dependencies [b4e427b]
  - @diageo/utils@4.0.4

## 3.0.4

### Patch Changes

- fcfb560: Added build service as contributor to NPM feeds
- Updated dependencies [fcfb560]
  - @diageo/utils@4.0.3

## 3.0.3

### Patch Changes

- 0912174: added NPM auth to pipes
- Updated dependencies [0912174]
  - @diageo/utils@4.0.2

## 3.0.2

### Patch Changes

- 859eb65: Updated project readme with new instructions for how to release
- Updated dependencies [859eb65]
  - @diageo/utils@4.0.1

## 3.0.1

### Patch Changes

- changed bahavior for NorthAmericaMap so onhover no listenes to both mouse over and out

## 3.0.0

### Major Changes

- Major update, no specifics since we're still touching everything

### Patch Changes

- Updated dependencies
  - @diageo/utils@4.0.0

## 2.0.0

### Major Changes

- Updating all packages since there has been lots of development on the entire codebase

### Patch Changes

- Updated dependencies
  - @diageo/utils@3.0.0

## 1.1.0

### Minor Changes

- Daily release

### Patch Changes

- Updated dependencies
  - @diageo/utils@2.1.0

## 1.0.0

### Major Changes

- no worries

### Patch Changes

- Updated dependencies
  - @diageo/utils@2.0.0

## 0.0.2

### Patch Changes

- 941b01e: working on changesets
- Updated dependencies [941b01e]
  - @diageo/utils@1.0.1
