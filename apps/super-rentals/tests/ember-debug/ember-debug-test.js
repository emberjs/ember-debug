import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Ember from 'ember';

module('ember-debug', function(hooks) {
  setupApplicationTest(hooks);

  test('emberVersion', async function(assert) {
    await visit('/');
    assert.ok(window.$edb, '$edb should be attached');
    assert.equal(typeof window.$edb.emberVersion, 'string', 'emberVersion should exist');
    // eslint-disable-next-line ember/new-module-imports
    assert.equal(window.$edb.emberVersion, Ember.VERSION);
  });
});
