(function(window, $) {
  'use strict';

  var userId = window.common.getQueryString('id');
  var maxScore = 5;

  var utils = {
    getReviewList: function(userId) {
      var d = $.Deferred();
      $.ajax({
        'type': 'GET',
        'url': 'http://210.140.71.3/reviews',
        'data': {
          'user_id': userId
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
    addReview: function(el, data, model) {
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
  };

  $(function() {
    utils.getReviewList(userId)
      .then(function(data) {
        view.addReview('review', data.reviews, function(review) {
          return {
            title: 'タイトル',
            userName: review.from_user.username,
            score: view.computedScore('score', review.score),
            message: review.comment,
            time: review.created_at.split(' ')[0]
          };
        });
      })
      .fail(function(err) {
        console.error(err);
      });
  });
}(window, jQuery));
