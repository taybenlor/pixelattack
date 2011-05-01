(function() {
  var EndController;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  EndController = (function() {
    __extends(EndController, Controller);
    function EndController(game) {
      this.game = game;
      EndController.__super__.constructor.apply(this, arguments);
      this.end_view = new EndView(null, this.game);
      this.end_view.listen('click', _(function(name, event) {
        return this.play();
      }).bind(this));
      $("#main").html(this.end_view.render());
    }
    EndController.prototype.play = function() {
      this.end_view = null;
      return window.game_controller = new GameController();
    };
    return EndController;
  })();
  window.EndController = EndController;
}).call(this);
