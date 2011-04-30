(function() {
  var Model;
  window.models = {};
  Model = (function() {
    Model.id = function() {
      if (this._id == null) {
        this._id = 1;
      }
      this._id += 1;
      return this._id - 1;
    };
    function Model() {
      this.id = Model.id();
      window.models[this.id] = this;
      this.attributes = _([]);
    }
    Model.prototype.attr = function(name, options) {
      var setter;
      options = options || {
        "default": null
      };
      this["_" + name] = options["default"];
      this["_" + name + "_listeners"] = _([]);
      this.attributes.push(name);
      if (options.get != null) {
        this.__defineGetter__(name, _.bind(options.get, this));
      } else {
        this.__defineGetter__(name, function() {
          return this["_" + name];
        });
      }
      setter = null;
      if (options.set != null) {
        setter = _.bind(options.set, this);
      } else {
        setter = function(y) {
          return this["_" + name] = y;
        };
      }
      return this.__defineSetter__(name, function(y) {
        var newval, oldval;
        oldval = this[name];
        setter.call(this, y);
        newval = this[name];
        return this["_" + name + "_listeners"].each(function(fn) {
          return fn(oldval, newval);
        });
      });
    };
    Model.prototype.listen = function(property, fn) {
      return this["_" + property + "_listeners"].push(fn);
    };
    Model.prototype.unlisten = function(property, fn) {
      return this["_" + property + "_listeners"] = this["_" + property + "_listeners"].without(fn);
    };
    return Model;
  })();
  window.Model = Model;
}).call(this);
