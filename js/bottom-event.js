/**
 * Bottom Event(require jQuery)
 * Author Orleika
 *
 * These codes are licensed under CC0.
 * http://creativecommons.org/publicdomain/zero/1.0/deed.ja
 *
 * Usage
 * $(window).bottom({ proximity: 0.2 });
 * $(window).bind('bottom', function() { // do at window scroll bottom });
 */
(function($) {
  'use strict';

  $.fn.bottom = function(options) {
    var defaults = {
      proximity: 0
    };
    options = $.extend(defaults, options);

    return this.each(function() {
      var obj = this;
      $(obj).bind('scroll', function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(obj).height() + $(obj).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight <= options.proximity) {
          $(obj).trigger('bottom');
        }
      });

      return false;
    });
  };
}(jQuery));
