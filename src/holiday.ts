import { HolidayType } from './holiday-type';

export type Holiday = {
  name: HolidayType;
  date: Date;
  trans(lang?: string): string | undefined; // depratced
  translate(lang?: string): string | undefined;
  dateString: string;
  equals(date: Date): boolean;

  getNormalizedDate(): number;
};
