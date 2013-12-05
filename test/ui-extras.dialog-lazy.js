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

  module('jQuery#dialog-lazy', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
      this.d1 = $("#dialog1").dialog({"autoOpen": false,
                  "href": "" } );
      this.d2 = $("#dialog2");
    }
  });

  test('is dialog', function() {
          expect(1);

          ok(this.d1.hasClass("ui-dialog-content"), 
             'should have ui-dialog-content class added');
	   this.d1.remove();
      });

  test("setup dialog with autoOpen", function() {
    // This test failed initially while developing tests, but not sure why
    // so it became our first bug fix :)
    expect(2);

    strictEqual(this.d2.hasClass("ui-dialog-content"), false, 'should NOT have ui-dialog-content class');

    this.d2.dialog({"autoOpen": true, 
                    "href": "" } );
    ok(this.d2.hasClass("ui-dialog-content"), 
       "should have ui-dialog-content class added");
    this.d2.remove();
  });

  test("is dialog opened with autoOpen", function() {
	  this.d2.remove();
	  //	  equal(this.d2.dialog("isOpen"), false, "dialog autoOpen:false == isOpen == false");
	  this.d2.dialog({"autoOpen": true, 
		      "href": "" } );
	  equal(this.d2.dialog("isOpen"), true, "dialog autoOpen:true == isOpen == true");	  

	  this.d1.remove();
	  this.d2.remove();
  });

  asyncTest("loading dialog from href", function() {
      expect(1);

      this.d2.dialog({href: "d2-dialog.inc"});
      this.d2.dialog("open");
      var that = this; 
  
      setTimeout(function() {
	  var loaded = $("#dialog-loaded").closest(".ui-dialog-content");
	  equal(loaded.length, 1, "dialog loaded content");	  
	  //	  equal(loaded[0], "", "dialog div");
	  that.d2.dialog("close");
	  start();
	  that.d1.remove();
	  that.d2.remove();
	  }, 2000);
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
