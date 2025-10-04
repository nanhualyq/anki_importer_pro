export const separatorList = [
  {
    value: '\t',
    label: 'Tab',
  },
  {
    value: ' ',
    label: 'Space',
  },
  {
    value: ',',
    label: 'Comma',
  },
  {
    value: ';',
    label: 'Semicolon',
  },
  {
    value: ':',
    label: 'Colon',
  },
];

export const deckList = [
  {
    name: 'Default',
    id: 1,
  },
];
export const notetypeList = [
  {
    name: 'Basic',
    id: 1,
    flds: [{ name: 'Front' }, { name: 'Back' }],
  },
  {
    name: 'Cloze',
    id: 2,
    flds: [{ name: 'Text' }, { name: 'Extra' }],
  },
];

export const quickFieldList = [
  {
    label: 'column 1 of prev line',
    value: '${lines[row - 1]?.[0]}',
  },
  {
    label: 'column 2 of prev line',
    value: '${lines[row - 1]?.[1]}',
  },
  {
    label: 'column 1 of next line',
    value: '${lines[row + 1]?.[0]}',
  },
  {
    label: 'column 2 of next line',
    value: '${lines[row + 1]?.[1]}',
  },
];
