import { defineBoot } from '#q-app/wrappers';
import { set } from 'lodash-es';
import { deckList, notetypeList } from 'src/data';

const dataMap: Record<string, unknown> = {
  getDecks: deckList,
  getNotetypes: notetypeList,
};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot((/* { app, router, ... } */) => {
  // something to do
  if (!window.pycmd) {
    window.pycmd = function (cmd, cb) {
      if (cb) {
        cb(dataMap[cmd]);
      }
    };
  }
  set(window, 'onPythonMessage', function (event: string, data: unknown) {
    const e = new CustomEvent(event, { detail: data });
    window.dispatchEvent(e);
  });
});
