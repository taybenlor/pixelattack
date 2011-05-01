(function() {
  var EnemyView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  EnemyView = (function() {
    __extends(EnemyView, View);
    function EnemyView(parent, enemy) {
      this.enemy = enemy;
      EnemyView.__super__.constructor.apply(this, arguments);
      this.element = $("<figure\nclass=\"enemy " + this.enemy.type + " on-converted\"\nstyle=\"-webkit-transform: translateX(" + (this.enemy.tile.x * 50) + "px) translateY(" + (this.enemy.tile.y * 50) + "px); z-index: " + (this.enemy.tile.y + 10) + "\">\n</figure>");
      this.enemy.listen("destroyed", _(function(old_val, new_val) {
        if (new_val) {
          this.parent.removeChild(this);
          return this.element.remove();
        }
      }).bind(this));
      this.enemy.listen("health", _(function(old_val, new_val) {
        var p;
        this.element.addClass('hit');
        _(_(function() {
          return this.element.removeClass('hit');
        }).bind(this)).delay(100);
        p = new_val / this.enemy.starting_health;
        if (p < 0.66) {
          this.element.addClass('damaged');
        }
        if (p < 0.33) {
          return this.element.addClass('severely');
        }
      }).bind(this));
      this.enemy.listen("converting", _(function(old_val, new_val) {
        if (new_val) {
          return this.element.addClass('converting');
        }
      }).bind(this));
    }
    EnemyView.prototype.render = function() {
      this.element.css('-webkit-transform', "translateX(" + (this.enemy.tile.x * 50) + "px) translateY(" + (this.enemy.tile.y * 50) + "px)");
      this.element.css('z-index', "" + this.enemy.tile.y);
      if (this.enemy.tile.converted) {
        this.element.addClass('on-converted');
      } else {
        this.element.removeClass('on-converted');
      }
      return this.element;
    };
    return EnemyView;
  })();
  window.EnemyView = EnemyView;
}).call(this);
