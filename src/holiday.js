// @flow
import type { HolidayType } from './holiday-type';

export type Holiday = {
  name: HolidayType,
  date: Date,
  trans: (lang: ?string) => string,
  dateString: string,
  equals: (date: Date) => boolean
};
