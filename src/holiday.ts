import { HolidayType } from './holiday-type';

export type Holiday = {
  name: HolidayType;
  date: Date;
  dateString: string;

  trans(lang?: string): string | undefined; // depratced
  translate(lang?: string): string | undefined;
  equals(date: Date): boolean;
  getNormalizedDate(): number;

};
