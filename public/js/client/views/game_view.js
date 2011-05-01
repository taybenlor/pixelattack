(function() {
  var GameView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  GameView = (function() {
    __extends(GameView, View);
    function GameView(parent, game) {
      this.game = game;
      GameView.__super__.constructor.apply(this, arguments);
      this.element = $("<section class=\"game\">\n\n</section>");
      this.game.listen('money', function(old_val, new_val) {
        return $("#money").html(new_val);
      });
      this.game.listen('score', function(old_val, new_val) {
        return $("#score").html(new_val);
      });
    }
    GameView.prototype.render = function() {
      this.element.html("<ul class=\"stats\">\n  <li id=\"score\">" + this.game.score + "</li>\n  <li id=\"money\">" + this.game.money + "</li>\n</ul>");
      this.children.each(_(function(v) {
        return this.element.append(v.render());
      }).bind(this));
      return this.element;
    };
    return GameView;
  })();
  window.GameView = GameView;
}).call(this);
