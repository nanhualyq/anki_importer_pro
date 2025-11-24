import { useState } from "react";

type props = {
  notetype: Notetype | undefined;
  onChange: (arg0: { key: string; val: string }) => void;
  convertField: (row: number, input: string) => string;
  fields: Record<string, string>;
  linesWithColumns: string[][];
};

function Fields({
  notetype,
  onChange,
  convertField,
  fields,
  linesWithColumns,
}: props) {
  const [fillField, setFillField] = useState("");
  if (!notetype) {
    return;
  }

  const fillList = linesWithColumns[0]
    ?.map((col, index) => ({
      label: `Column ${index + 1}`,
      text: col,
      code: `\${line[${index}]}`,
    }))
    ?.concat([
      {
        label: "Column 1 of prev line",
        text: "",
        code: `\${lines[row - 1]?.[0]}`,
      },
      {
        label: "Column 2 of prev line",
        text: "",
        code: `\${lines[row - 1]?.[1]}`,
      },
      {
        label: "Column 1 of next line",
        text: linesWithColumns[1]?.[0],
        code: `\${lines[row + 1]?.[0]}`,
      },
      {
        label: "Column 2 of next line",
        text: linesWithColumns[1]?.[1],
        code: `\${lines[row + 1]?.[1]}`,
      },
    ]);

  return (
    <>
      <fieldset style={{ border: "1px solid gray", padding: "1rem" }}>
        <legend>Fields</legend>
        {notetype.flds.map((field) => (
          <label key={field.name}>
            {field.name}
            <a
              style={{
                marginLeft: "1rem",
                textDecoration: "none",
                cursor: "pointer",
              }}
              title="Quick Code Snippets"
              onClick={() => {
                setFillField(field.name);
              }}
            >
              ⚡Quick Fill
            </a>
            <textarea
              value={fields[field.name] || ""}
              onChange={(e) =>
                onChange({ key: `fields.${field.name}`, val: e.target.value })
              }
            ></textarea>
            <small
              dangerouslySetInnerHTML={{
                __html: convertField(0, fields[field.name] || ""),
              }}
            ></small>
          </label>
        ))}
      </fieldset>
      <dialog
        open={!!fillField}
        onClose={() => setFillField("")}
        style={{ flexDirection: "column", gap: "1rem" }}
      >
        <ul>
          {fillList?.map((item, index) => (
            <li
              key={index}
              className="fill-li"
              onClick={() => {
                onChange({
                  key: `fields.${fillField}`,
                  val: `${fields[fillField] || ""}${item.code}`,
                });
                setFillField("");
              }}
            >
              {item.label}
              <br />
              <small>{item.text}&nbsp;</small>
            </li>
          ))}
        </ul>
        <button onClick={() => setFillField("")}>Close</button>
      </dialog>
    </>
  );
}

export default Fields;
