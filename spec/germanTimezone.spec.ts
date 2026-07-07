// Tests for toGermanTimezoneTimestamp function
// This function should return the UTC timestamp for midnight in German timezone
// regardless of the server's timezone setting.

import { describe, it, expect } from 'vitest';
import { isHoliday, getHolidayByDate, isSpecificHoliday } from '../src/feiertage';

describe('German timezone conversion', () => {
  /**
   * Test that midnight calculation works correctly.
   * 
   * Example: "2025-05-28T23:00:00.00Z" (UTC)
   * In German timezone (CEST, UTC+2): This is 2025-05-29 01:00:00
   * The function should identify this as May 29th in Germany.
   * 
   * Christi Himmelfahrt in 2025 is on May 29th.
   */
  describe('Christi Himmelfahrt 2025 (May 29)', () => {
    it('should recognize 2025-05-28T23:00:00Z as May 29 (01:00 German time)', () => {
      const date = new Date('2025-05-28T23:00:00.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday).toBeDefined();
      expect(holiday?.name).toBe('CHRISTIHIMMELFAHRT');
    });

    it('should recognize 2025-05-28T22:00:00Z as May 29 (00:00 German time - exact midnight)', () => {
      const date = new Date('2025-05-28T22:00:00.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('CHRISTIHIMMELFAHRT');
    });

    it('should recognize 2025-05-29T00:00:00Z as May 29 (02:00 German time)', () => {
      const date = new Date('2025-05-29T00:00:00.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('CHRISTIHIMMELFAHRT');
    });

    it('should recognize 2025-05-29T21:59:59Z as May 29 (23:59:59 German time)', () => {
      const date = new Date('2025-05-29T21:59:59.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('CHRISTIHIMMELFAHRT');
    });

    it('should NOT recognize 2025-05-28T21:59:59Z as holiday (23:59:59 May 28 German time)', () => {
      const date = new Date('2025-05-28T21:59:59.00Z');
      expect(isHoliday(date, 'ALL')).toBe(false);
    });
  });

  describe('New Year 2025 (January 1) - Winter time UTC+1', () => {
    it('should recognize 2024-12-31T23:00:00Z as Jan 1 (00:00 German time - exact midnight)', () => {
      const date = new Date('2024-12-31T23:00:00.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('NEUJAHRSTAG');
    });

    it('should recognize 2025-01-01T00:00:00Z as Jan 1 (01:00 German time)', () => {
      const date = new Date('2025-01-01T00:00:00.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('NEUJAHRSTAG');
    });

    it('should NOT recognize 2024-12-31T22:59:59Z as New Year (23:59:59 Dec 31 German time)', () => {
      const date = new Date('2024-12-31T22:59:59.00Z');
      expect(isHoliday(date, 'ALL')).toBe(false);
    });
  });

  describe('Christmas 2025 (December 25) - Winter time UTC+1', () => {
    it('should recognize 2025-12-24T23:00:00Z as Dec 25 (00:00 German time)', () => {
      const date = new Date('2025-12-24T23:00:00.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('ERSTERWEIHNACHTSFEIERTAG');
    });

    it('should recognize 2025-12-25T23:00:00Z as Dec 26 (00:00 German time)', () => {
      const date = new Date('2025-12-25T23:00:00.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('ZWEITERWEIHNACHTSFEIERTAG');
    });
  });

  describe('Tag der Arbeit 2025 (May 1) - Summer time UTC+2', () => {
    it('should recognize 2025-04-30T22:00:00Z as May 1 (00:00 German time)', () => {
      const date = new Date('2025-04-30T22:00:00.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('TAG_DER_ARBEIT');
    });

    it('should NOT recognize 2025-04-30T21:59:59Z as holiday (23:59:59 April 30 German time)', () => {
      const date = new Date('2025-04-30T21:59:59.00Z');
      expect(isHoliday(date, 'ALL')).toBe(false);
    });
  });

  describe('Tag der Deutschen Einheit 2025 (October 3) - Summer time UTC+2', () => {
    // Note: October 3 is still in summer time (DST ends last Sunday of October)
    it('should recognize 2025-10-02T22:00:00Z as Oct 3 (00:00 German time)', () => {
      const date = new Date('2025-10-02T22:00:00.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('DEUTSCHEEINHEIT');
    });

    it('should recognize 2025-10-02T23:00:00Z as Oct 3 (01:00 German time)', () => {
      const date = new Date('2025-10-02T23:00:00.00Z');
      expect(isHoliday(date, 'ALL')).toBe(true);
    });
  });

  describe('Edge cases around DST transitions', () => {
    // DST starts last Sunday of March at 02:00 (clocks go forward to 03:00)
    // DST ends last Sunday of October at 03:00 (clocks go back to 02:00)

    // March 30, 2025 is the last Sunday of March (DST starts)
    it('should handle date just before DST starts (March 29, 2025)', () => {
      // March 29, 2025 is not a holiday, but we can test the timezone conversion works
      const date = new Date('2025-03-29T23:00:00.00Z'); // 00:00 March 30 in CET (UTC+1)
      // This should be March 30 in German timezone
      const holiday = getHolidayByDate(date, 'ALL');
      // Not a holiday, but the function should not crash
      expect(holiday).toBeUndefined();
    });

    // October 26, 2025 is the last Sunday of October (DST ends)
    it('should handle date during DST transition (October 26, 2025)', () => {
      const date = new Date('2025-10-26T01:00:00.00Z'); // During the DST transition
      // Should not crash, just verify it handles the date
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday).toBeUndefined(); // Oct 26 is not a holiday
    });
  });

  describe('Dates created with local timezone constructors', () => {
    // Note: When using Date(year, month, day), the date is created at midnight LOCAL time.
    // This means the actual moment in time depends on the server's timezone.
    // The library correctly interprets dates in German timezone.
    // 
    // For example, in Tokyo (UTC+9):
    // - new Date(2025, 4, 29) = May 29 00:00 Tokyo = May 28 15:00 UTC = May 28 17:00 German
    // So this would be May 28 in German timezone, NOT May 29.
    //
    // To avoid timezone confusion, use explicit UTC dates or create dates at noon:
    
    it('should correctly identify holiday when using Date.UTC()', () => {
      // Using Date.UTC ensures the date is timezone-independent
      const date = new Date(Date.UTC(2025, 4, 29, 12, 0, 0)); // May 29, 2025 at noon UTC
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('CHRISTIHIMMELFAHRT');
    });

    it('should correctly identify Christmas when using Date.UTC()', () => {
      const date = new Date(Date.UTC(2025, 11, 25, 12, 0, 0)); // December 25, 2025 at noon UTC
      expect(isHoliday(date, 'ALL')).toBe(true);
      
      const holiday = getHolidayByDate(date, 'ALL');
      expect(holiday?.name).toBe('ERSTERWEIHNACHTSFEIERTAG');
    });
  });

  describe('Dates created with milliseconds', () => {
   it('should recognize UTC date "2025-05-28T23:00:00.500Z" as holiday even with non-zero milliseconds', () => {
    const date = new Date('2025-05-28T23:00:00.500Z');
    expect(isHoliday(date, 'ALL')).toBe(true);
    expect(isSpecificHoliday(date, 'CHRISTIHIMMELFAHRT', 'ALL')).toBe(true);
    });
  });

});
