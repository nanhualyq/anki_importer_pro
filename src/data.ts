import { useEffect, useState } from "react";

export const INPUT_SEPARATOR = "Input what you need";

export const separatorList = [
  {
    value: "\t",
    label: "Tab",
  },
  {
    value: " ",
    label: "Space",
  },
  {
    value: ",",
    label: "Comma",
  },
  {
    value: ";",
    label: "Semicolon",
  },
  {
    value: ":",
    label: "Colon",
  },
  {
    value: INPUT_SEPARATOR,
    label: "Other",
  },
];

export const deckListMock = [
  {
    name: "Default",
    id: 1,
  },
  {
    name: "Custom",
    id: 2,
  },
];

export const notetypeListMock = [
  {
    name: "Basic",
    id: 1,
    flds: [{ name: "Front" }, { name: "Back" }],
  },
  {
    name: "Cloze",
    id: 2,
    flds: [{ name: "Text" }, { name: "Extra" }],
  },
];

export default function useData() {
  const [deckList, setDeckList] = useState(deckListMock);
  const [notetypeList, setNotetypeList] = useState(notetypeListMock);

  useEffect(() => {
    pycmd("getDecks", (res) => setDeckList(res as typeof deckListMock));
    pycmd("getNotetypes", (res) =>
      setNotetypeList(res as typeof notetypeListMock)
    );
  }, []);

  return { deckList, notetypeList };
}
