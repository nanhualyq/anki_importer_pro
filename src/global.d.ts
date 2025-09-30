declare global {
  function pycmd(p: string): void;
  interface Window {
    pycmd: (p: string) => void;
  }
}

export {};
