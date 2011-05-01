(function() {
  var IntroController;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  IntroController = (function() {
    __extends(IntroController, Controller);
    function IntroController() {
      IntroController.__super__.constructor.apply(this, arguments);
      this.intro_view = new IntroView(null);
      this.intro_view.listen('click', _(function(name, event) {
        return this.play;
      }).bind(this));
      $("#main").html(this.intro_view.render());
    }
    IntroController.prototype.play = function() {
      this.intro_view = null;
      return window.game_controller = new GameController();
    };
    return IntroController;
  })();
  window.IntroController = IntroController;
}).call(this);
