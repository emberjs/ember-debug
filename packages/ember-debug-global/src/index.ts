import EmberDebug, { GlobalContext, GlobalEmber } from 'ember-debug';

type Global = Window & typeof globalThis;

interface GlobalEmberDebug extends EmberDebug {
  attach: typeof EmberDebug.attach;
}

const attach = EmberDebug.attach.bind(EmberDebug);

const attached = new WeakMap<GlobalEmber, GlobalEmberDebug | undefined>();

Object.defineProperty(window, '$edb', {
  get(): GlobalEmberDebug | undefined {
    let { Ember } = (window as Global & Partial<GlobalContext>);

    if (Ember) {
      if (!attached.has(Ember)) {
        let edb = attach(window);

        if (edb) {
          let $edb = (edb as GlobalEmberDebug);
          $edb.attach = attach;
          attached.set(Ember, $edb);
        }
      }

      return attached.get(Ember);
    }
  }
});
