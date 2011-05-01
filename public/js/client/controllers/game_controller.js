(function() {
  var GameController;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  GameController = (function() {
    __extends(GameController, Controller);
    function GameController() {
      var tick;
      GameController.__super__.constructor.apply(this, arguments);
      window.ticks = Date.now();
      this.game = new Game();
      this.game_view = new GameView(null, this.game);
      this.map_view = new MapView(this.game_view, this.game.map);
      this.game_view.listen('click', _(function(name, event) {
        return this.buildTower(event.source.tile, 'default');
      }).bind(this));
      $("#main").html(this.game_view.render());
      tick = _(function() {
        window.ticks = Date.now();
        this.game.update();
        return _(tick).defer();
      }).bind(this);
      tick();
    }
    GameController.prototype.buildTower = function(tile, type) {
      return this.game.build(tile, type);
    };
    return GameController;
  })();
  window.GameController = GameController;
}).call(this);
