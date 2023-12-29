import { Region } from '..';
import { HolidayType } from './holiday-type';

export type Holiday = {
  name: HolidayType;
  date: Date;
  dateString: string;
  regions: Region[];

  // @deprecated
  trans(lang?: string): string | undefined;

  translate(lang?: string): string | undefined;
  equals(date: Date): boolean;
  getNormalizedDate(): number;

};
