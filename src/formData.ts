import { template } from "lodash-es";
import { useReducer } from "react";

export default function useFormData() {
  const [formData, setFormData] = useReducer(
    (formData, { key, val }: { key: string; val: unknown }) => {
      if (key.startsWith("fields.") && typeof val === "string") {
        const key2 = key.replace("fields.", "");
        return { ...formData, fields: { ...formData.fields, [key2]: val } };
      } else if (key === "notetype") {
        return { ...formData, [key]: val as Notetype, fields: {} };
      }
      return { ...formData, [key]: val };
    },
    {} as FormDataState
  );

  const linesWithColumns = (formData.text || "")
    .split("\n")
    .filter((s) => s.trim())
    .map((line) => {
      if (!formData.separator) {
        return [line];
      }
      return line.split(formData.separator);
    });

  function convertField(row: number, input: string) {
    try {
      const compiled = template(input?.replace(/\n/g, "<br>"), {
        imports: {
          lines: linesWithColumns,
          line: linesWithColumns[row],
        },
      });
      return compiled({ row });
    } catch (error) {
      return String(error);
    }
  }

  return {
    formData,
    setFormData,
    linesWithColumns,
    convertField,
  };
}
