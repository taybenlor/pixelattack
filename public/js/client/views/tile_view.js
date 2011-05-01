(function() {
  var TileView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  TileView = (function() {
    __extends(TileView, View);
    function TileView(parent, tile, width, height) {
      var _ref, _ref2, _ref3, _ref4;
      this.tile = tile;
      this.width = width;
      this.height = height;
      TileView.__super__.constructor.apply(this, arguments);
      this.event('click');
      if (this.width == null) {
        this.width = 50;
      }
      if (this.height == null) {
        this.height = 50;
      }
      this.element = $("<figure data-x=\"" + this.tile.x + "\" data-y=\"" + this.tile.y + "\"\n  class=\"tile\" \n  style=\"width:" + this.width + "px;height:" + this.height + "px;top:" + (this.tile.y * this.height) + "px;left:" + (this.tile.x * this.width) + "px\">\n</figure>");
      this.element.click(_(function() {
        return this.fire('click', {
          source: this,
          details: ''
        });
      }).bind(this));
      this.thing_view = null;
      this.tile.listen('thing', _(function(old_val, new_val) {
        var old;
        this.children = _([]);
        old = this.thing_view;
        if (new_val instanceof Tower) {
          this.thing_view = new TowerView(this, new_val);
          return this.render();
        } else if (new_val instanceof Enemy) {
          this.thing_view = this.parent.enemy_views[new_val.id];
          if (!this.thing_view) {
            this.thing_view = new EnemyView(parent, new_val);
            this.parent.enemy_views[new_val.id] = this.thing_view;
            return this.parent.element.append(this.thing_view.element);
          } else {
            return this.thing_view.render();
          }
        }
      }).bind(this));
      this.converted_around = {};
      this.force_render = _(function(old_val, new_val) {
        return this.render();
      }).bind(this);
      this.tile.listen('converted', this.force_render);
      if ((_ref = this.tile.right()) != null) {
        _ref.listen('converted', this.force_render);
      }
      if ((_ref2 = this.tile.left()) != null) {
        _ref2.listen('converted', this.force_render);
      }
      if ((_ref3 = this.tile.up()) != null) {
        _ref3.listen('converted', this.force_render);
      }
      if ((_ref4 = this.tile.down()) != null) {
        _ref4.listen('converted', this.force_render);
      }
    }
    TileView.prototype.render = function() {
      var allowed;
      if (this.tile.converted) {
        this.element.removeClass('right');
        this.element.removeClass('left');
        this.element.removeClass('up');
        this.element.removeClass('down');
        this.element.addClass('converted');
        allowed = [];
        if ((this.tile.right() != null) && !this.tile.right().converted) {
          allowed.push('right');
        }
        if ((this.tile.left() != null) && !this.tile.left().converted) {
          allowed.push('left');
        }
        if ((this.tile.down() != null) && !this.tile.down().converted) {
          allowed.push('down');
        }
        if ((this.tile.up() != null) && !this.tile.up().converted) {
          allowed.push('up');
        }
        _(allowed).each(_(function(classname) {
          return this.element.addClass(classname);
        }).bind(this));
        if (!this.tile.up()) {
          this.element.addClass('top');
        }
        if (!this.tile.down()) {
          this.element.addClass('bottom');
        }
      }
      this.element.html("");
      this.children.each(_(function(v) {
        return this.element.append(v.render());
      }).bind(this));
      return this.element;
    };
    return TileView;
  })();
  window.TileView = TileView;
}).call(this);
