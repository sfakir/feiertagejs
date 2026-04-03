# Project Context

## What this project is

`feiertagejs` is a small TypeScript library for calculating German public holidays by region.

Primary use cases:
- Get all holidays for a year and region
- Check whether a `Date` is a holiday
- Check whether a `Date` is a specific holiday
- Translate holiday names

The library is timezone-sensitive by design: all incoming dates are interpreted in `Europe/Berlin`.

## Current stack

- Language: TypeScript
- Package type: ESM (`"type": "module"`)
- Test runner: Vitest
- Build: Rollup
- Formatting: Prettier
- Linting: ESLint

## Main entrypoints

- [`src/feiertage.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/src/feiertage.ts): core library logic and public API
- [`index.d.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/index.d.ts): published type declarations
- [`Readme.md`](/Users/simonfakir/dev/feiertage/feiertagejs/Readme.md): user-facing overview
- [`docs.md`](/Users/simonfakir/dev/feiertage/feiertagejs/docs.md): generated API docs

## Public API

Implemented in [`src/feiertage.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/src/feiertage.ts):

- `getHolidays(year, region): Holiday[]`
- `isHoliday(date, region): boolean`
- `isSpecificHoliday(date, holidayName, region = 'ALL'): boolean`
- `getHolidayByDate(date, region = 'ALL'): Holiday | void`
- `isSunOrHoliday(date, region): boolean`
- `addTranslation(isoCode, table): void`
- `setLanguage(isoCode): void`
- `getLanguage(): string`

Key exported domain types:
- [`src/regions.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/src/regions.ts): `Region`, `allRegions`
- [`src/holiday-type.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/src/holiday-type.ts): `HolidayType`, `allHolidays`
- [`src/holiday.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/src/holiday.ts): `Holiday`

## How the core logic works

Holiday generation is centralized in `getHolidaysOfYear(year, region)` inside [`src/feiertage.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/src/feiertage.ts).

High-level flow:
- Compute Easter date
- Derive movable feasts from Easter
- Add common nationwide holidays
- Add state-specific holidays by helper function
- Add custom local region holidays like `AUGSBURG`
- Sort by date ascending

Important helper functions:
- `getEasterDate(year)`: computes Easter Sunday
- `getBussBettag(year)`: computes Buß- und Bettag
- `makeDate(year, month, day)`: creates dates at noon UTC
- `toGermanTimezoneTimestamp(date)`: normalizes a `Date` to midnight in German timezone
- `getYearInGermanTimezone(date)`: reads the relevant calendar year in German timezone

## Critical behavior rules

These are the most important invariants for future edits:

- All input dates must be interpreted in `Europe/Berlin`, not the server's local timezone.
- Holiday creation uses noon UTC to avoid date drift across timezones.
- Holiday comparisons should normalize to German calendar days, not raw timestamps.
- `ALL` means any holiday that exists in at least one supported region.
- `BUND` means only holidays that are nationwide.
- `newHoliday()` expands region `['ALL']` to `allRegions`.
- Translation fallback is German when a custom translation table is incomplete.

## Backward compatibility constraints

This project now has an explicit compatibility requirement after `v1.5.0`:

- The library is used in thousands of applications, so API stability is a hard constraint.
- The `Europe/Berlin` normalization introduced in `v1.5.0` fixed timezone correctness, but it also broke older usage patterns where consumers passed `new Date(year, month - 1, day)` and expected that to represent a plain calendar date.
- Future work should try to preserve both:
- Correct German-timezone behavior for real timestamps
- A backward-compatible path for "date only" usage, where callers effectively mean `YYYY-MM-DD` without caring about timezone math
- When evaluating API changes, treat ergonomic calendar-date input as a product requirement, not just a documentation issue.
- When making behavior changes, keep older scenarios covered by unit tests so regressions are caught before release.
- Do not remove or silently reinterpret established API behavior unless there is no safe alternative.
- Repro cases should include servers running in timezones east of Germany, because that is where `new Date(year, month - 1, day)` most clearly shifts to the previous German calendar day.

## Region and holiday rules currently encoded

Examples of special handling in [`src/feiertage.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/src/feiertage.ts):

- `REFORMATIONSTAG` is nationwide in 2017 only
- `WELTKINDERTAG` applies in `TH` from 2019 onward
- `WELTFRAUENTAG` applies in `BE` from 2019 onward and in `MV` from 2023 onward
- `AUGSBURGER_FRIEDENSFEST` applies only to `AUGSBURG`
- `AUGSBURG` is treated as a custom local region in addition to German states

## Files that matter most for changes

If you need to change behavior, read these first:

1. [`src/feiertage.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/src/feiertage.ts)
2. Relevant specs under [`spec/`](/Users/simonfakir/dev/feiertage/feiertagejs/spec)
3. [`index.d.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/index.d.ts) if the public types change
4. [`Readme.md`](/Users/simonfakir/dev/feiertage/feiertagejs/Readme.md) and [`docs.md`](/Users/simonfakir/dev/feiertage/feiertagejs/docs.md) if user-facing API/behavior changes

## Test coverage themes

Representative specs:

- [`spec/timezone.spec.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/spec/timezone.spec.ts): timezone conversion behavior
- [`spec/germanTimezone.spec.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/spec/germanTimezone.spec.ts): DST and German-day normalization
- [`spec/feiertage.spec.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/spec/feiertage.spec.ts): basic holiday behavior
- [`spec/errors.spec.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/spec/errors.spec.ts): invalid input handling
- [`spec/translation.spec.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/spec/translation.spec.ts): language and fallback behavior

## Build and local commands

- Install: `pnpm install`
- Test: `pnpm test`
- Watch tests: `pnpm test:w`
- Lint: `pnpm lint`
- Format: `pnpm format`
- Build: `pnpm build`

## Publishing outputs

Configured in [`package.json`](/Users/simonfakir/dev/feiertage/feiertagejs/package.json) and [`rollup.config.js`](/Users/simonfakir/dev/feiertage/feiertagejs/rollup.config.js):

- `build/feiertage.js`: ES module
- `build/feiertage.umd.cjs`: UMD/CommonJS-style browser/node output
- `build/feiertage.esm.js`: additional ESM bundle

## Known implementation gotchas

- The repo currently mixes modern TS source with a hand-maintained top-level `index.d.ts`.
- Some tests import `../src/Holiday` even though the file on disk is [`src/holiday.ts`](/Users/simonfakir/dev/feiertage/feiertagejs/src/holiday.ts). This can matter on case-sensitive filesystems.
- `docs.md` is generated documentation, so source comments should remain aligned with runtime behavior.
- `localeDateObjectToDateString()` still relies on the runtime timezone offset of the `Date` object, so any date-formatting changes should be reviewed carefully against timezone tests.

## Guidance for future LLM edits

- Preserve the German-timezone contract unless the task explicitly changes API semantics.
- Do not assume the `v1.5.0` timezone fix is sufficient if it breaks prior "plain date" workflows.
- Treat existing public APIs as stable by default.
- If a change affects existing consumers, add or update regression tests for the old scenario before or alongside the fix.
- When adding a new holiday rule, update both logic and tests.
- When changing exported types or signatures, update `index.d.ts`.
- When changing public behavior, update `Readme.md` and `docs.md` or leave a note that docs are stale.
- Prefer creating test dates with `Date.UTC(..., 12, 0, 0)` unless a timezone-edge case is being tested deliberately.

## Short mental model

Think of this project as:

"A deterministic German-holiday engine whose main complexity is not the holiday formulas themselves, but correct calendar-day handling in `Europe/Berlin` across arbitrary server timezones."
