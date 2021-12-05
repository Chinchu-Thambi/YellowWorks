const regionList = {
  Northland: 'Northland',
  'Manawatu-Wanganui': 'Manawatu Region',
  Canterbury: 'Canterbury Region',
  'Bay Of Plenty': 'Bay Of Plenty',
  Marlborough: 'Marlborough Region',
  Wellington: 'Wellington Region',
  Nelson: 'Nelson Region',
  Taranaki: 'Taranaki',
  Auckland: 'Auckland Region',
  Waikato: 'Waikato Region',
  Otago: 'Otago',
  Gisborne: 'Gisborne Region',
  Southland: 'Southland Region',
  'West Coast': 'West Coast',
  Tasman: 'Nelson Region',
  "Hawke's Bay": 'Hawkes Bay',
};

const getAdwordsRegion = (googleRegion) => regionList[googleRegion];

export default getAdwordsRegion;
