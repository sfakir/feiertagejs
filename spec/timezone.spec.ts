// Tests for timezone conversion bug
// The functions should convert dates to German timezone before checking if it's a holiday
//
// NOTE: These tests demonstrate a bug where UTC dates are not converted to German timezone
// before checking if they're holidays. The tests will PASS when run in German timezone (CET/CEST)
// but will FAIL when run in other timezones (e.g., America/New_York), demonstrating the bug.
//
// Expected behavior: When a UTC date like "2025-05-28T23:00:00.00Z" is passed, it should be
// converted to German timezone first (where it's already May 29th) before checking if it's a holiday.

import { describe, it, expect } from 'vitest';
import { isHoliday, isSpecificHoliday, getHolidayByDate } from '../src/feiertage';

describe('Timezone conversion bug - UTC dates should be converted to German timezone', () => {
  it('should keep legacy local-constructor usage working for date-only checks in timezones east of Germany', () => {
    const originalTz = process.env.TZ;

    try {
      process.env.TZ = 'Asia/Tokyo';
      const christmas = new Date(2025, 11, 25);

      expect(christmas.toISOString()).toBe('2025-12-24T15:00:00.000Z');
      expect(isHoliday(christmas, 'ALL')).toBe(false);

      expect(isHoliday('2025-12-25', 'ALL')).toBe(true);
      expect(isSpecificHoliday('2025-12-25', 'ERSTERWEIHNACHTSFEIERTAG', 'ALL')).toBe(true);
      expect(getHolidayByDate('2025-12-25', 'ALL')?.name).toBe('ERSTERWEIHNACHTSFEIERTAG');
    } finally {
      process.env.TZ = originalTz;
    }
  });

  /**
   * Bug: "2025-05-28T23:00:00.00Z" is already 2025-05-29 in Germany (UTC+1 or UTC+2)
   * and should be recognized as Christi Himmelfahrt, but currently fails because
   * the function only checks the day without converting to German timezone first.
   */
  it('should recognize UTC date "2025-05-28T23:00:00.00Z" as Christi Himmelfahrt (May 29, 2025)', () => {
    const date11 = new Date('2025-05-28T23:00:00.00Z');
    
    // In Germany, this UTC time is already May 29th
    // Should be recognized as a holiday (Christi Himmelfahrt)
    expect(isHoliday(date11, 'ALL')).toBe(true);
    
    // Should specifically be Christi Himmelfahrt
    expect(isSpecificHoliday(date11, 'CHRISTIHIMMELFAHRT', 'ALL')).toBe(true);
    
    // getHolidayByDate should return the holiday
    const holiday = getHolidayByDate(date11, 'ALL');
    expect(holiday).toBeDefined();
    expect(holiday?.name).toBe('CHRISTIHIMMELFAHRT');
  });

  /**
   * Test case: UTC date at 22:00 UTC on May 28, 2025
   * In Germany (UTC+2 during summer time), this is 00:00 on May 29, 2025
   * Should be recognized as Christi Himmelfahrt
   */
  it('should recognize UTC date "2025-05-28T22:00:00.00Z" as Christi Himmelfahrt (May 29, 2025)', () => {
    const date = new Date('2025-05-28T22:00:00.00Z');
    
    expect(isHoliday(date, 'ALL')).toBe(true);
    expect(isSpecificHoliday(date, 'CHRISTIHIMMELFAHRT', 'ALL')).toBe(true);
  });

  /**
   * Test case: UTC date at 00:00 UTC on May 29, 2025
   * In Germany (UTC+2 during summer time), this is 02:00 on May 29, 2025
   * Should be recognized as Christi Himmelfahrt
   */
  it('should recognize UTC date "2025-05-29T00:00:00.00Z" as Christi Himmelfahrt', () => {
    const date = new Date('2025-05-29T00:00:00.00Z');
    
    expect(isHoliday(date, 'ALL')).toBe(true);
    expect(isSpecificHoliday(date, 'CHRISTIHIMMELFAHRT', 'ALL')).toBe(true);
  });

  /**
   * Test case: UTC date at 23:00 UTC on December 24, 2025
   * In Germany (UTC+1 during winter time), this is 00:00 on December 25, 2025
   * Should be recognized as First Christmas Day (Erster Weihnachtsfeiertag)
   */
  it('should recognize UTC date "2025-12-24T23:00:00.00Z" as First Christmas Day', () => {
    const date = new Date('2025-12-24T23:00:00.00Z');
    
    expect(isHoliday(date, 'ALL')).toBe(true);
    expect(isSpecificHoliday(date, 'ERSTERWEIHNACHTSFEIERTAG', 'ALL')).toBe(true);
  });

  /**
   * Test case: UTC date at 23:00 UTC on December 25, 2025
   * In Germany (UTC+1 during winter time), this is 00:00 on December 26, 2025
   * Should be recognized as Second Christmas Day (Zweiter Weihnachtsfeiertag)
   */
  it('should recognize UTC date "2025-12-25T23:00:00.00Z" as Second Christmas Day', () => {
    const date = new Date('2025-12-25T23:00:00.00Z');
    
    expect(isHoliday(date, 'ALL')).toBe(true);
    expect(isSpecificHoliday(date, 'ZWEITERWEIHNACHTSFEIERTAG', 'ALL')).toBe(true);
  });

  /**
   * Test case: UTC date at 23:00 UTC on December 31, 2024
   * In Germany (UTC+1 during winter time), this is 00:00 on January 1, 2025
   * Should be recognized as New Year's Day (Neujahrstag)
   */
  it('should recognize UTC date "2024-12-31T23:00:00.00Z" as New Year\'s Day (2025)', () => {
    const date = new Date('2024-12-31T23:00:00.00Z');
    
    expect(isHoliday(date, 'ALL')).toBe(true);
    expect(isSpecificHoliday(date, 'NEUJAHRSTAG', 'ALL')).toBe(true);
  });

  /**
   * Test case: UTC date at 22:00 UTC on April 30, 2025
   * In Germany (UTC+2 during summer time), this is 00:00 on May 1, 2025
   * Should be recognized as Tag der Arbeit (Labor Day)
   */
  it('should recognize UTC date "2025-04-30T22:00:00.00Z" as Tag der Arbeit (May 1, 2025)', () => {
    const date = new Date('2025-04-30T22:00:00.00Z');
    
    expect(isHoliday(date, 'ALL')).toBe(true);
    expect(isSpecificHoliday(date, 'TAG_DER_ARBEIT', 'ALL')).toBe(true);
  });

  /**
   * Test case: UTC date at 23:00 UTC on October 2, 2025
   * In Germany (UTC+2 during summer time), this is 01:00 on October 3, 2025
   * Should be recognized as Tag der Deutschen Einheit
   */
  it('should recognize UTC date "2025-10-02T23:00:00.00Z" as Tag der Deutschen Einheit', () => {
    const date = new Date('2025-10-02T23:00:00.00Z');
    
    expect(isHoliday(date, 'ALL')).toBe(true);
    expect(isSpecificHoliday(date, 'DEUTSCHEEINHEIT', 'ALL')).toBe(true);
  });

  /**
   * Test case: UTC date at 01:00 UTC on May 28, 2025
   * In Germany (UTC+2 during summer time), this is 03:00 on May 28, 2025
   * Should NOT be recognized as a holiday (still May 28, not May 29)
   */
  it('should NOT recognize UTC date "2025-05-28T01:00:00.00Z" as a holiday (still May 28)', () => {
    const date = new Date('2025-05-28T01:00:00.00Z');
    
    // This is still May 28 in Germany, not May 29
    expect(isHoliday(date, 'ALL')).toBe(false);
    expect(isSpecificHoliday(date, 'CHRISTIHIMMELFAHRT', 'ALL')).toBe(false);
  });

  /**
   * Test case: UTC date at 23:59 UTC on May 27, 2025
   * In Germany (UTC+2 during summer time), this is 01:59 on May 28, 2025
   * Should NOT be recognized as a holiday (still May 28, not May 29)
   */
  it('should NOT recognize UTC date "2025-05-27T23:59:00.00Z" as a holiday (still May 28)', () => {
    const date = new Date('2025-05-27T23:59:00.00Z');
    
    // This is still May 28 in Germany, not May 29
    expect(isHoliday(date, 'ALL')).toBe(false);
  });
});
