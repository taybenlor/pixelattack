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
    function EndController() {
      EndController.__super__.constructor.apply(this, arguments);
    }
    EndController.prototype.restart = function() {
      return window.game_controller = new GameController();
    };
    return EndController;
  })();
  window.EndController = EndController;
}).call(this);
