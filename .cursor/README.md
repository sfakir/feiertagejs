# Feiertage.js - Project Overview for Cursor

## Project Purpose

Feiertage.js is a **zero-dependency TypeScript library** for calculating German holidays (Feiertage) for each German state (Bundesland). The library provides functions to check if a date is a holiday, get all holidays for a year, and determine specific holidays by name.

## Key Features

- **Zero dependencies** - Pure TypeScript implementation
- **Type-safe** - Full TypeScript support with strict mode enabled
- **Regional support** - Supports all 16 German states plus special regions (AUGSBURG, ALL, BUND)
- **Translation support** - German translations built-in, extensible for other languages
- **Date calculations** - Calculates Easter-based holidays (Karfreitag, Ostermontag, Christi Himmelfahrt, Pfingsten, Fronleichnam, Buss- und Bettag)

## Project Structure

```
feiertagejs/
├── src/                    # Source code (TypeScript)
│   ├── feiertage.ts        # Main API and holiday calculation logic
│   ├── holiday.ts          # Holiday type definition
│   ├── holiday-type.ts     # HolidayType enum and constants
│   ├── regions.ts          # Region type and constants
│   └── translations/       # Translation files
│       ├── german-translations.ts   # German translations
│       └── english-translations.ts  # English translations
├── spec/                   # Test files (Vitest)
│   ├── feiertage.spec.ts   # Main test suite
│   ├── timezone.spec.ts    # Timezone conversion bug tests
│   └── *.spec.ts           # Other test files
├── build/                  # Build output (generated)
├── sample/                 # Example code
└── docs.md                 # API documentation
```

## Core Concepts

### Types

- **`HolidayType`**: Union type of all possible holiday names (e.g., 'NEUJAHRSTAG', 'CHRISTIHIMMELFAHRT')
- **`Region`**: Union type of German states and special regions ('BW', 'BY', 'BE', ..., 'ALL', 'BUND', 'AUGSBURG')
- **`Holiday`**: Object containing holiday information (name, date, dateString, regions, translation methods)

### Key Functions

- **`isHoliday(date, region)`**: Checks if a date is a holiday in the given region
- **`getHolidays(year, region)`**: Returns all holidays for a year in a region
- **`isSpecificHoliday(date, holidayName, region)`**: Checks if a date is a specific holiday
- **`getHolidayByDate(date, region)`**: Gets the holiday object for a specific date
- **`isSunOrHoliday(date, region)`**: Checks if a date is Sunday or a holiday

### Date Handling

- **All dates are interpreted in German timezone (Europe/Berlin)**
- Holidays are stored as JavaScript `Date` objects at noon UTC
- The library uses `Intl.DateTimeFormat` with `timeZone: 'Europe/Berlin'` to convert dates
- This ensures correct behavior regardless of the server's timezone setting

**Best practices for creating dates:**
- For current date: `new Date()` works fine
- For specific dates: Use `new Date(Date.UTC(year, month, day, 12, 0, 0))` for timezone independence
- Or use ISO strings with timezone: `new Date('2025-12-25T12:00:00+01:00')`

### Holiday Calculation

1. **Fixed holidays**: New Year, Labor Day, German Unity Day, Christmas (calculated directly)
2. **Easter-based holidays**: Calculated from Easter date using offsets:
   - Karfreitag: Easter - 2 days
   - Ostermontag: Easter + 1 day
   - Christi Himmelfahrt: Easter + 39 days
   - Pfingstsonntag: Easter + 49 days
   - Pfingstmontag: Easter + 50 days
   - Fronleichnam: Easter + 60 days
   - Buss- und Bettag: Calculated from Advent
3. **Regional holidays**: Added based on region (e.g., Heilige Drei Könige, Fronleichnam, Reformationstag)

## Coding Patterns

### Function Organization

- **Public API functions**: Exported functions with JSDoc comments
- **Private helper functions**: Prefixed with descriptive names, marked `@private` in JSDoc
- **Validation functions**: `checkRegion()`, `checkHolidayType()` - throw errors for invalid input

### Date Creation

- Use `makeDate(year, naturalMonth, day)` for creating dates (naturalMonth is 1-12)
- Use `addDays(date, days)` for date arithmetic
- Use `toUtcTimestamp(date)` for comparing dates (sets hours to 0,0,0,0 in local timezone)

### Holiday Creation

- Use `newHoliday(name, date, regions)` factory function
- Regions array can contain specific regions or `['ALL']` (which expands to all regions)
- Holidays are sorted by date before returning

### Testing

- Tests use Vitest framework
- Test files follow pattern: `*.spec.ts`
- Tests are organized by feature/region/year
- Use descriptive test names explaining what is being tested

## Important Notes

1. **Timezone Handling**: All dates are converted to German timezone (Europe/Berlin) before checking holidays. This works correctly regardless of the server's timezone.

2. **Date Comparisons**: The `equals()` method on Holiday objects compares dates in German timezone, ignoring time.

3. **Region 'ALL' vs 'BUND'**:
   - `'ALL'`: Returns holidays valid in **at least** one region
   - `'BUND'`: Returns holidays valid in **all** regions (bundesweit)

4. **Deprecated Methods**: The `trans()` method is deprecated in favor of `translate()`

## Build & Test

- **Build**: `pnpm run build` (uses Rollup)
- **Test**: `pnpm test` (Vitest with coverage)
- **Lint**: `pnpm run lint` (ESLint)
- **Format**: `pnpm run format` (Prettier)

## Dependencies

- **Runtime**: Zero dependencies
- **Dev Dependencies**: TypeScript, Vitest, Rollup, ESLint, Prettier
