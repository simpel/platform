# Page Rollout

## EPAGE_TYPES enum

This doc explains the page rollout and page caching strategy for ISR
The enum `EPAGE_TYPES` should include all the page types (content types) that will be rolled out.
This will enforces strict typing of content types.

## PAGETYPES constant

The contant `PAGETYPES` is nothing but the array of `EPAGE_TYPES` values. Once a new page type added to the enum `EPAGE_TYPES`, then `PAGETYPES` automatically generates.

## customLifeTime vatiable

The variable `customLifeTime` includes the page type that needs a different caching time - which means the revalidate interval, inturn the max-age for cache control. So the CDN cache will be set to the specified value. Value can be set per template/page for flexibility.

`DEFAULT_LIFE_TIME` is the default value set to 60 mins (3600s).

## getRevalidateInterval function

The function `getRevalidateInterval` returns the revalidate interval for specified page type. If the page type is not defined in the variable `customLifeTime` then the `DEFAULT_LIFE_TIME` will be returned.
