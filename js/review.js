(function(window, $) {
  'use strict';

  var ticketId = parseInt(window.common.getQueryString('ticket_id'), 10);
  // var token = window.common.me.token;
  var token = 'LyiiWG9cqWeNpVvPN6p7mSkxaYgiG1yg';
  var maxScore = 5;

  // ログイン状態の確認
  if (!token) {
    window.location.href = 'toppage.html';
  }

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
    }
  };

  var controller = {
    init: function() {
      utils.getTicket(ticketId)
        .then(function(ticket) {console.log(ticket);
          view.review.add('ticketTitle', ticket.title);

          $('#ticketImage').css('background', 'url(' + ticket.header_img_url + ') center center');
          return utils.getUser(ticket.bought_user_id);
        })
        .then(function(user) {
          $('img#user-img').attr('src', user.profile_img_url);
          $('#last-first-name').text(user.last_name + ' ' + user.first_name);
          $('#user-name').text(user.username);
          var star = Math.floor(user.review_ave);
          var star_i = 5 - star;
          for (var j = 0; j < star; j++) {
            $('#user-evaluation').append('<span class="icon-inline-star-r"></span>');
          }
          for (var i = 0; i < star_i; i++) {
            $('#user-evaluation').append('<span class="icon-inline-star-r-i"></span>');
          }
          $('#star-number').text(user.review_ave);
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
