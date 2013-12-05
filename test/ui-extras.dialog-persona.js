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

  module('jQuery#dialog-persona', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
      this.d1 = $("#dialog1").dialog({"autoOpen": false,
                  "personas": {"a" : {"title": "a"}, "b": {"title": "b"}}} );
      this.d2 = $("#dialog2");
    }
  });
  test('is dialog', function() {
          expect(1);

          ok(this.d1.hasClass("ui-dialog-content"), 
             'should have ui-dialog-content class added');
      });

  test("setup dialog with autoOpen", function() {
    // This test failed initially while developing tests, but not sure why
    // so it became our first bug fix :)
    expect(2);

    strictEqual(this.d2.hasClass("ui-dialog-content"), false, 'should NOT have ui-dialog-content class');

    this.d2.dialog({"autoOpen": true, 
                    "personas": {"a" : {"title": "a"}, "b": {"title": "b"}}} );
    ok(this.d2.hasClass("ui-dialog-content"), 
       "should have ui-dialog-content class added");
    this.d2.remove();
  });

  test("test active persona after open", function() {
    // This test failed initially while developing tests, but not sure why
    // so it became our first bug fix :)
    expect(5);

    strictEqual(this.d2.hasClass("ui-dialog-content"), false, 
                "should NOT have ui-dialog-content class");

    this.d2.dialog({"autoOpen": true,
                   "personas": {"a" : {"title": "A"}, "b": {"title": "B"}}} );
    ok(this.d2.hasClass("ui-dialog-content"), 
       "should have ui-dialog-content class added");
    equal(this.d2.dialog("persona"), "a", 
          "first persona added after open should be set");

    equal(this.d2.dialog("persona","b"), "b", 
          "switch to b persona");
    equal(this.d2.dialog("persona"), "b", 
          "check we are switched to b persona");
    this.d2.remove();
  });

  test("test persona switch trigger on open", function() {
    expect(2);

    this.d2.on("dialogpersona", function(ev,data) {
	    equal(data.oldpersona, false, "Dialog persona callback oldpersona");
	    equal(data.persona, "a", "Dialog persona callback persona");
        });

    this.d2.dialog({"autoOpen": true,
                "personas": {"a" : {"title": "A"}, "b": {"title": "B"}}} );
    this.d2.remove();
  });

  test("test persona switch trigger, open + switch", function() {
    expect(3);

    this.d2.dialog({"autoOpen": true,
                "personas": {"a" : {"title": "A"}, "b": {"title": "B"}}} );

    this.d2.on("dialogpersona", function(ev, data) {
            if (data.oldpersona && data.persona) {
		equal(data.oldpersona, "a", "Dialog persona callback oldpersona");
		equal(data.persona, "b", "Dialog persona callback persona");
            }
        });

    equal(this.d2.dialog("persona", "b"), "b", 
          "switched to b persona");
    this.d2.remove();
  });


  test("add persona after open", function() {
    // This test failed initially while developing tests, but not sure why
    // so it became our first bug fix :)
    expect(2);

    this.d2.dialog({"autoOpen": false});
    this.d2.dialog("open");
    this.d2.dialog({"personas": {"a" : {"title": "a"}, "b": {"title": "b"}}} );
    ok(this.d2.hasClass("ui-dialog-content"), 
       "should have ui-dialog-content class added");
    equal(this.d2.dialog("persona"), "a", 
          "first persona added after open should be set");
    this.d2.remove();
  });

  // test("is awesome", function() {
  //   expect(1);
  //   strictEqual(this.elems.ui_extras().text(), 'awesome0awesome1awesome2', 'should be awesome');
  // });

  // module('jQuery.ui_extras');

  // test('is awesome', function() {
  //   expect(2);
  //   strictEqual($.ui_extras(), 'awesome.', 'should be awesome');
  //   strictEqual($.ui_extras({punctuation: '!'}), 'awesome!', 'should be thoroughly awesome');
  // });

  // module(':ui_extras selector', {
  //   // This will run before each test in this module.
  //   setup: function() {
  //     this.elems = $('#qunit-fixture').children();
  //   }
  // });

  // test('is awesome', function() {
  //   expect(1);
  //   // Use deepEqual & .get() when comparing jQuery objects.
  //   deepEqual(this.elems.filter(':ui_extras').get(), this.elems.last().get(), 'knows awesome when it sees it');
  // });

}(jQuery));
