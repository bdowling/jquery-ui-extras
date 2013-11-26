/*! Ui Extras - v0.1.0 - 2013-11-26
* https://github.com/bdowling/jquery-ui-extras
* Copyright (c) 2013 Brian J. Dowling; Licensed MIT, Apache-2.0 */
(function($) {

  // Collection method.
  $.fn.ui_extras = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.ui_extras = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.ui_extras.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.ui_extras.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].ui_extras = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
