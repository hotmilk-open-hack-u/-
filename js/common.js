(function(window) {
  'use strict';

  var common = {
    getQueryString: function getQueryString(key) {
      var query = window.location.search.substr(1).split('&'),
        hash;
      for (var i = 0; i < query.length; i++) {
        hash = query[i].split('=');
        if (key === hash[0]) {
          return hash[1];
        }
      }
    }
  };

  window.common = common;
})(window);
