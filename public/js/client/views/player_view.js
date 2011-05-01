(function() {
  var PlayerView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  PlayerView = (function() {
    __extends(PlayerView, View);
    function PlayerView(parent, player) {
      this.player = player;
      PlayerView.__super__.constructor.apply(this, arguments);
    }
    return PlayerView;
  })();
  window.PlayerView = PlayerView;
}).call(this);
