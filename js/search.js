(function(window, $) {
  'use strict';

  var utils = {
    saerch: function(data) {
      var d = $.Deferred();
      $.ajax({
        'type': 'GET',
        'url': 'http://210.140.71.3/tickets.json',
        'data': data
      }).done(function(data) {
        d.resolve(data);
      }).fail(function(jqXHR) {
        d.reject(jqXHR.statusText);
      });
      return d.promise();
    }
  };

  var view = {
    bind: function($el, model) {
      for (var key in model) {
        if (model.hasOwnProperty(key)) {
          $('.' + key, $el).html(model[key]);
        }
      }
      return $el;
    },
    addTicket: function(el, data, model) {
      var $template = $('#template .' + el).clone(),
        $target = $('#' + el),
        $tickets = [];

      data.forEach(function(review) {
        $tickets.push(view.bind($template.clone(), model(review)));
      });
      $target.append($tickets);
    }
  };

  $(function() {
  });
}(window, jQuery));
