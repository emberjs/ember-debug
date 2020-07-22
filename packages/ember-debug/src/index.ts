export interface GlobalContext {
  Ember: GlobalEmber;
}

export interface GlobalEmber {
  VERSION: string;
}

function hasEmber(context: unknown): context is GlobalContext {
  return context && typeof (context as Partial<GlobalContext>).Ember?.VERSION === 'string';
}

export default class EmberDebug {
  static attach(context: unknown): EmberDebug | undefined {
    if (hasEmber(context)) {
      return new EmberDebug(context);
    }
  }

  private Ember: GlobalEmber;

  private constructor({ Ember }: GlobalContext) {
    this.Ember = Ember;
  }

  get emberVersion(): string {
    return this.Ember.VERSION;
  }
}
