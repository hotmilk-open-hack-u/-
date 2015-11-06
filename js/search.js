(function(window, $) {
  'use strict';

  var select_paramater;
  var vueSelectParamater;

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

  };

  $(function() {
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

    // データバインディングの設定
    var vueSex = new Vue({
      el: 'selector-sex',
      data: {
        male: false,
        female: false
      }
    });
    var vueLocation = new Vue({
      el: '#selector-location',
      data: {
        online: false,
        offline: false
      }
    });
    var vueSkill = new Vue({
      el: '#selector-skill',
      data: {
        beginner: false,
        veteran: false
      }
    });
    var vueSort = new Vue({
      el: '#selector-sort',
      data: {
        sort: 'popular'
      }
    });
    // 検索ボタンクリックの時の設定
    $('#searchbtn').click(function() {
      // チケットの購入申請一覧を取得
      $.ajax({
        type: 'get',
        url: 'http://210.140.71.3/tickets',
        data: {
          'sort': 'price',
          'order': 'a',
          'limit': 5,
          'offset': 10
        },
        contentType: 'application/x-www-form-urlencoded;application/json;application/json',
        success: function(data) {
          console.log(data);
        },
        error: function(xhr, textStatus, errorThrown) {
          console.log('error.');
          console.log(xhr, textStatus, errorThrown);
        }
      });
    });
  });
}(window, jQuery));
