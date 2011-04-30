(function() {
  var Action, Server, TICK_TIME;
  Action = (function() {
    function Action(method, arguments) {
      this.method = method;
      this.arguments = arguments;
      this.ticks = window.server.ticks;
    }
    Action.prototype["do"] = function() {
      return window.game_controller[this.method].apply(window.game_controller, this.arguments);
    };
    Action.prototype.toJSON = function() {
      var arg;
      return {
        ticks: this.ticks,
        method: this.method,
        arguments: (function() {
          var _i, _len, _ref, _results;
          _ref = this.arguments;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            arg = _ref[_i];
            _results.push(JSON.stringify(arg));
          }
          return _results;
        }).call(this)
      };
    };
    Action.fromJSON = function(str) {
      var obj;
      obj = JSON.parse(str);
      return new Action(obj.id, obj.method, obj.arguments);
    };
    return Action;
  })();
  TICK_TIME = 100;
  Server = (function() {
    function Server() {
      this.last_time = Date.now();
      this.ticks = 0;
      this.to_send = _([]);
      this.to_work = _([]);
    }
    Server.prototype.build = function() {
      var i, now;
      if (!(this.ticks > BUILD_TIME)) {
        return;
      }
      now = Date.now();
      this.received = (function() {
        var _i, _len, _ref, _results;
        _ref = this.to_send;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          _results.push(Action.fromJSON(i.toJSON()));
        }
        return _results;
      }).call(this);
      this.to_work = _(this.received).sortBy(function(el) {
        return -1 * el.ticks;
      });
      while (this.to_work.length) {
        this.dequeue();
      }
      return this.ticks = now - this.ticks;
    };
    Server.prototype.tick = function() {
      var now;
      now = Date.now();
      this.ticks += Date.now() - this.last_time;
      return this.last_time = now;
    };
    Server.prototype.queue = function(action) {
      return this.to_send.push(action);
    };
    Server.prototype.dequeue = function() {
      return this.to_work.pop()["do"]();
    };
    Server.run = function() {
      var do_stuff, server;
      server = new Server();
      do_stuff = _(function() {
        server.tick;
        server.build;
        return _(arguments.calee).defer();
      }).defer();
      return server;
    };
    return Server;
  })();
  log('Loading...');
  window.server = Server.run();
  window.game_controller = new GameController(window.server);
  log('Loaded');
}).call(this);
