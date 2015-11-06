(function(window, $) {
  'use strict';

  var ticketId = parseInt(window.common.getQueryString('ticket_id'), 10);
  var token = window.common.me.token;
  var maxScore = 5;

  var utils = {
    getUser: function(userId) {
      var d = $.Deferred();
      $.ajax({
        'type': 'GET',
        'url': 'http://210.140.71.3/users/' + userId + '.json'
      }).done(function(data) {
        d.resolve(data);
      }).fail(function(jqXHR) {
        d.reject(jqXHR.statusText);
      });
      return d.promise();
    },
    getTicket: function(ticketId) {
      var d = $.Deferred();
      $.ajax({
        'type': 'GET',
        'url': 'http://210.140.71.3/tickets/' + ticketId + '.json'
      }).done(function(data) {
        d.resolve(data);
      }).fail(function(jqXHR) {
        d.reject(jqXHR.statusText);
      });
      return d.promise();
    },
    postReview: function(data) {
      var d = $.Deferred();
      $.ajax({
        'type': 'POST',
        'url': 'http://210.140.71.3/reviews.json',
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
    review: {
      add: function(target, data) {
        var $target = $('#' + target);
        $target.text(data);
      },
      computedScore: function(score, $src, $dst) {
        var i = 0;
        for (; i < score; i++) {
          $src.children().eq(i).addClass('icon-inline-star');
        }
        for (; i < maxScore; i++) {
          $src.children().eq(i).removeClass('icon-inline-star');
        }
        $dst.val(score);
      }
    },
    user: {
      computedScore: function(el, score) {},
      add: function(el, data, model) {}
    }
  };

  var controller = {
    init: function() {
      utils.getTicket(ticketId)
        .then(function(ticket) {
          view.review.add('ticketTitle', ticket.title);
          return utils.getUser(ticket.user.id);
        })
        .then(function(user) {
          console.log(user);
        });
    },
    send: function(score, comment) {
      score = parseInt(score, 10);
      if (score === 0) {
        // TBD
        return false;
      }
      var data = {
        'user': {
          'token': token
        },
        'review': {
          'score': score,
          'comment': comment
        },
        'ticket_id': ticketId
      };
      utils.postReview(data)
        .then(function() {
          window.location.href = 'detail.html?ticket_id=' + ticketId;
        });
    }
  };

  $(function() {
    $('#submit').on('click', function() {
      controller.send($('#reviewScore').val(), $('#reviewComment').val());
    });

    $('#reviewScoreUi span').on('click', function() {
      view.review.computedScore($(this).data('id'), $('#reviewScoreUi'), $('#reviewScore'));
    });

    controller.init();
  });
}(window, jQuery));
