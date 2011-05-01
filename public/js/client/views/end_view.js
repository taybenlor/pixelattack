(function() {
  var EndView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  EndView = (function() {
    __extends(EndView, View);
    function EndView(parent, game) {
      this.game = game;
      EndView.__super__.constructor.apply(this, arguments);
      this.element = $("<section class=\"intro\">\n  <h1><strong class=\"pixels\">You Lose</strong></h1>\n    \n  <h1><strong class=\"pixels\"> " + this.game.score + "pts </strong></h1>\n  \n  <button>Again?</button>\n</section>");
      this.element.children('button').click(_(function() {
        return this.fire('click', {
          source: this,
          details: ''
        });
      }).bind(this));
    }
    EndView.prototype.render = function() {
      return this.element;
    };
    return EndView;
  })();
  window.EndView = EndView;
}).call(this);
