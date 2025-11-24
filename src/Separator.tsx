import { useState } from "react";
import { INPUT_SEPARATOR, separatorList } from "./data";


function Separator(props: { onChange: (arg0: string) => void }) {
  const [val, setVal] = useState("");
  return (
    <>
      <select
        onChange={(e) => {
          setVal(e.target.value);
          if (e.target.value === INPUT_SEPARATOR) {
            props.onChange("");
          } else {
            props.onChange(e.target.value);
          }
        }}
      >
        <option value="" label="Select a separator"></option>
        {separatorList.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label} ({item.value})
          </option>
        ))}
      </select>
      {val === INPUT_SEPARATOR && (
        <input
          type="text"
          autoFocus
          onChange={(e) => props.onChange(e.target.value)}
        />
      )}
    </>
  );
}

export default Separator;
