import EmberDebug, { GlobalContext, GlobalEmber } from 'ember-debug';

type Global = Window & typeof globalThis;

interface GlobalEmberDebug extends EmberDebug {
  attach: typeof EmberDebug.attach;
}

if (Object.getOwnPropertyDescriptor(window, '$edb')) {
  console.warn('Refusing to load ember-debug as a copy of it has already been loaded.');
} else {
  const attach = EmberDebug.attach.bind(EmberDebug);

  const attached = new WeakMap<GlobalEmber, GlobalEmberDebug | undefined>();

  Object.defineProperty(window, '$edb', {
    get(): GlobalEmberDebug | undefined {
      let { Ember } = (window as Global & Partial<GlobalContext>);

      let edb: GlobalEmberDebug | undefined;

      if (Ember) {
        edb = attached.get(Ember);

        if (!edb) {
          edb = attach(window) as GlobalEmberDebug | undefined;

          if (edb) {
            edb.attach = attach;
            attached.set(Ember, edb);
          }
        }
      }

      if (!edb) {
        console.warn('Ember not detected, $edb is unavailable.');
      }

      return edb;
    }
  });
}
