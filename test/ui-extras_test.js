(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#ui_extras', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.ui_extras(), this.elems, 'should be chainable');
  });

  test('is awesome', function() {
    expect(1);
    strictEqual(this.elems.ui_extras().text(), 'awesome0awesome1awesome2', 'should be awesome');
  });

  module('jQuery.ui_extras');

  test('is awesome', function() {
    expect(2);
    strictEqual($.ui_extras(), 'awesome.', 'should be awesome');
    strictEqual($.ui_extras({punctuation: '!'}), 'awesome!', 'should be thoroughly awesome');
  });

  module(':ui_extras selector', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is awesome', function() {
    expect(1);
    // Use deepEqual & .get() when comparing jQuery objects.
    deepEqual(this.elems.filter(':ui_extras').get(), this.elems.last().get(), 'knows awesome when it sees it');
  });

}(jQuery));
