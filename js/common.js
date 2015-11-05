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
    },
    get me() {
      return {
        userId: window.localStorage.getItem('user_id'),
        token: window.localStorage.getItem('token')
      };
    }
  };

  window.common = common;
})(window);
