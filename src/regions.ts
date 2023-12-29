export type Region =
  | 'BW' // Baden-Württemberg
  | 'BY' // Bayern
  | 'BE' // Berlin
  | 'BB' // Brandenburg
  | 'HB' // Bremen
  | 'HE' // Hessen
  | 'HH' // Hamburg
  | 'MV' // Mecklenburg-Vorpommern
  | 'NI' // Niedersachsen
  | 'NW' // Nordrhein-Westfalen
  | 'RP' // Rheinland-Pfalz
  | 'SL' // Saarland
  | 'SN' // Sachsen
  | 'ST' // Sachsen-Anhalt
  | 'SH' // Schleswig-Holstein
  | 'TH' // Thüringen
  | 'BUND' // Gesamt-Deutschland
  // Custom regions with local holidays (incomplete) !
  | 'AUGSBURG'
  | 'ALL';

export const allRegions: Region[] = [
  'BW',
  'BY',
  'BE',
  'BB',
  'HB',
  'HE',
  'HH',
  'MV',
  'NI',
  'NW',
  'RP',
  'SL',
  'SN',
  'ST',
  'SH',
  'TH',
  'BUND',
  'AUGSBURG',
  'ALL',
];
