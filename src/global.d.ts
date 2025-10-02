declare global {
  function pycmd(p: string, cb?: (r: unknown) => void): void;
  interface Window {
    pycmd: (p: string, cb?: (r: unknown) => void) => void;
  }
}

export {};
