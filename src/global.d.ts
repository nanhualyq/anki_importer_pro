declare global {
  function pycmd(p: string, cb?: (r: unknown) => void): void;
  interface Window {
    pycmd: (p: string, cb?: (r: unknown) => void) => void;
  }
  type FormDataState = {
    text: string;
    separator: string;
    deck: string;
    notetype: Notetype | undefined;
    fields: Record<string, string>;
  };
  type Notetype = {
    id: number;
    name: string;
    flds: { name: string }[];
  };
}

export {};
