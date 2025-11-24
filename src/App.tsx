import { type FormEvent } from "react";
import "./App.css";
import Separator from "./Separator";
import Fields from "./Fields";
import useData from "./data";
import useFormData from "./formData";

function App() {
  const { deckList, notetypeList } = useData();
  const { formData, setFormData, linesWithColumns, convertField } =
    useFormData();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const notes = linesWithColumns.map((_, index) => {
      const note: Record<string, string> = {};
      for (const key of Object.keys(formData.fields)) {
        note[key] = convertField(index, formData.fields[key]);
      }
      return note;
    });
    Object.assign(window, {
      _data: {
        notes,
        deckId: formData.deck,
        notetypeId: formData?.notetype!.id,
      },
    });
    pycmd("save");
  }

  return (
    <form style={{ padding: "8px" }} onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setFormData({ key: "text", val: e.target.value })}
        placeholder="Input text here, every line will be a card"
        rows={Math.min(linesWithColumns.length, 10)}
        autoFocus
        required
      ></textarea>
      <small>{linesWithColumns.length} lines</small>
      <Separator onChange={(val) => setFormData({ key: "separator", val })} />
      <small>{linesWithColumns[0]?.length || 0} Columns</small>
      <select
        onChange={(e) => setFormData({ key: "deck", val: e.target.value })}
        required
      >
        <option value="" label="Select a deck"></option>
        {deckList.map((deck) => (
          <option key={deck.id} value={deck.id}>
            {deck.name}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => {
          setFormData({ key: "notetype", val: notetypeList[+e.target.value] });
        }}
        required
      >
        <option value="-1" label="Select a notetype"></option>
        {notetypeList.map((notetype, index) => (
          <option key={notetype.id} value={index}>
            {notetype.name}
          </option>
        ))}
      </select>
      <Fields
        notetype={formData.notetype}
        onChange={setFormData}
        convertField={convertField}
        fields={formData.fields}
        linesWithColumns={linesWithColumns}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default App;
