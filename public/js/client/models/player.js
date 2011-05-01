(function() {
  var Player;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Player = (function() {
    __extends(Player, Model);
    function Player(name, colour, local) {
      this.name = name;
      this.colour = colour;
      this.local = local;
      Player.__super__.constructor.apply(this, arguments);
      this.local = !!this.local;
      this.attr('score', {
        "default": 0
      });
      this.attr('lives', {
        "default": 0
      });
      this.attr('money', {
        "default": 100
      });
      this.tiles = _([]);
    }
    Player.prototype.join = function(game) {
      this.game = game;
      return this.game.addPlayer(this);
    };
    return Player;
  })();
  window.Player = Player;
}).call(this);
