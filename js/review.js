(function(window, $) {
  'use strict';

  var ticketId = window.common.getQueryString('ticket_id');
  var token = window.common.me.token;
  var maxScore = 5;

  var utils = {
    postReview: function(user, review, ticket_id) {
      var d = $.Deferred();
      $.ajax({
        'type': 'POST',
        'url': 'http://210.140.71.3/reviews',
        'data': {
          'user': user,
          'review': review,
          'ticket_id': ticket_id
        }
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
      computedScore: function(score, $src, $dst) {
        var i = 0;
        for (; i < score; i++) {
          $src.children().eq(i).addClass('icon-inline-star');
        }
        for (; i < maxScore; i++) {
          $src.children().eq(i).removeClass('icon-inline-star');
        }
        $dst.val(score);
      },
      get: function(src, model) {

      }
    },
    user: {
      computedScore: function(el, score) {
        var $template = $('#template > .' + el).clone(),
          $dst = [],
          i = 0;

        for (; i < score; i++) {
          $dst.push($('.inc', $template).clone());
        }
        for (; i < maxScore; i++) {
          $dst.push($('.dsc', $template).clone());
        }
        return $dst;
      },
      add: function(el, data, model) {
        var $template = $('#template .' + el).clone(),
          $target = $('#' + el),
          $reviews = [],
          length = data.length;

        data.forEach(function(review, idx) {
          $reviews.push(view.bind($template.clone(), model(review)));
          if (idx < length - 1) {
            $reviews.push($('<hr>'));
          }
        });
        $target.append($reviews);
      }
    }
  };

  var controller = {
    send: function(score, comment) {
      var score = parseInt(score, 10);
      if (score === 0) {
        // TBD
        return false;
      }
      utils.postReview({
          'token': token
        }, {
          'score': score,
          'comment': comment
        },
        ticketId
      ).then(function() {
        location.href('detail.html?ticket_id=' + ticketId);
      });
    }
  }

  $(function() {
    $('#submit').on('click', function() {
      controller.send($('#reviewScore').val(), $('#reviewComment').val());
    });

    $('#reviewScoreUi span').on('click', function() {
      view.review.computedScore($(this).data('id'), $('#reviewScoreUi'), $('#reviewScore'));
    });

    // utils.getReviewList(userId)
    //   .then(function(data) {
    //     view.addReview('review', data.reviews, function(review) {
    //       return {
    //         title: 'タイトル',
    //         userName: review.from_user.username,
    //         score: view.computedScore('score', review.score),
    //         message: review.comment,
    //         time: review.created_at.split(' ')[0]
    //       };
    //     });
    //   })
    //   .fail(function(err) {
    //     console.error(err);
    //   });
  });
}(window, jQuery));
