import { describe, it, expect } from 'vitest';
import { getHolidays, isSpecificHoliday } from '../src/feiertage';
import { Holiday } from '../src/holiday';

// Helper to create timezone-independent dates (at noon UTC)
const dateUTC = (year: number, month: number, day: number) =>
  new Date(Date.UTC(year, month, day, 12, 0, 0, 0));

describe('Check Feiertage by Name', () => {
  it('check ChristiHimmelfahrt 2016: check wrong dates', () => {
    // source: http://www.schulferien.org/Feiertage/2016/feiertage_2016.html
    expect(
      isSpecificHoliday(dateUTC(2016, 9, 15), 'CHRISTIHIMMELFAHRT'),
    ).toEqual(false);
    expect(
      isSpecificHoliday(dateUTC(2016, 11, 24), 'CHRISTIHIMMELFAHRT'), // Fixed: month 12 doesn't exist, using 11 for December
    ).toEqual(false);
  });
  it('check ChristiHimmelfahrt 2016: check right date', () => {
    // 5.5.2016
    const somedate = dateUTC(2016, 4, 5);
    expect(isSpecificHoliday(somedate, 'CHRISTIHIMMELFAHRT')).toEqual(true); // und Vatertag
  });

  it('check Erster Weihnachtsfeiertag 2016: check right date', () => {
    // 25.12.2016
    const somedate = dateUTC(2016, 11, 25);
    expect(isSpecificHoliday(somedate, 'ERSTERWEIHNACHTSFEIERTAG')).toEqual(
      true,
    );
  });

  it('check Erster Weihnachtsfeiertag 2016: check wrong date', () => {
    // 29.12.2016
    const somedate = dateUTC(2016, 11, 29);
    expect(isSpecificHoliday(somedate, 'ERSTERWEIHNACHTSFEIERTAG')).toEqual(
      false,
    );
  });
  it('every holiday should have a translation', () => {
    const holidays: Holiday[] = getHolidays(2016, 'ALL');

    for (const holiday of holidays) {
      const translation = holiday.translate();
      expect(translation).toBeTruthy();
    }
  });
});
