(function(window, $, Vue) {
  'use strict';

  var selectorSex = new Vue({
      el: '#selector-sex'
    }),
    selectorLocation = new Vue({
      el: '#selector-location'
    }),
    selectorSkill = new Vue({
      el: '#selector-skill'
    }),
    selectorSort = new Vue({
      el: '#selector-sort'
    });


  var utils = {
    getTickets: function(data) {
      var d = $.Deferred();
      $.ajax({
        'type': 'GET',
        'url': 'http://210.140.71.3/tickets',
        contentType: 'application/x-www-form-urlencoded;application/json;application/json',
        'data': data
      }).done(function(data) {
        d.resolve(data);
      }).fail(function(jqXHR) {
        d.reject(jqXHR.statusText);
      });
      return d.promise();
    }
  };

  var store = (function() {
    var _gender = 0,
      _location = 0,
      _skill = 0,
      _sort = 0;

    return {
      get gender() {
        return _gender;
      },
      set gender(val) {
        if (_gender === val) {
          _gender = 0;
        } else {
          _gender = val;
        }
      },
      get location() {
        return _location;
      },
      set location(val) {
        if (_location === val) {
          _location = 0;
        } else {
          _location = val;
        }
      },
      get skill() {
        return _skill;
      },
      set skill(val) {
        if (_skill === val) {
          _skill = 0;
        } else {
          _skill = val;
        }
      },
      get sort() {
        return _sort;
      },
      set sort(val) {
        if (_sort === val) {
          _sort = 0;
        } else {
          _sort = val;
        }
      }
    };
  }());

  var view = {
    bind: function($el, model) {
      for (var key in model) {
        if (model.hasOwnProperty(key)) {
          $('.' + key, $el).html(model[key]);
        }
      }
      return $el;
    },
    addTickets: function(target, data) {
      var $target = $('#' + target);
      $target.text(data);
    },
  };

  var controller = {
    refleshUi: function() {
      var data;
      if (!store.gender) {
        data = {
          male: false,
          female: false
        };
      } else if (store.gender === 1) {
        data = {
          male: true,
          female: false
        };
      } else if (store.gender === 2) {
        data = {
          male: false,
          female: true
        };
      }
      selectorSex.$data = data;
      if (!store.location) {
        data = {
          online: false,
          offline: false
        };
      } else if (store.location === 1) {
        data = {
          online: true,
          offline: false
        };
      } else if (store.location === 2) {
        data = {
          online: false,
          offline: true
        };
      }
      selectorLocation.$data = data;
      if (!store.skill) {
        data = {
          beginner: false,
          veteran: false
        };
      } else if (store.skill === 1) {
        data = {
          beginner: true,
          veteran: false
        };
      } else if (store.skill === 2) {
        data = {
          beginner: false,
          veteran: true
        };
      }
      selectorSkill.$data = data;
      if (!store.sort) {
        data = {
          sort: ''
        };
      } else if (store.sort === 1) {
        data = {
          sort: 'popular'
        };
      } else if (store.sort === 2) {
        data = {
          sort: 'new'
        };
      } else if (store.sort === 3) {
        data = {
          sort: 'time'
        };
      } else if (store.sort === 4) {
        data = {
          sort: 'price_asc'
        };
      } else if (store.sort === 5) {
        data = {
          sort: 'price_dsc'
        };
      }
      selectorSort.$data = data;
    }
  };

  $(function() {
    controller.refleshUi();
    
    var filterMenu = false;
    $('#filterMenuBtn').on('click', function() {
      filterMenu = !filterMenu;
      if (filterMenu) {
        $('#filterMenu').addClass('open');
      } else {
        $('#filterMenu').removeClass('open');
      }
    });
    $('#searchbtn').on('click', function() {
      filterMenu = false;
      $('#filterMenu').removeClass('open');
    });

    $('.searchFilter').on('click', function() {
      var type = $(this).data('type');
      var val = parseInt($(this).data('val'));
      store[type] = val;
      controller.refleshUi();
    });
  });
}(window, jQuery, Vue));
