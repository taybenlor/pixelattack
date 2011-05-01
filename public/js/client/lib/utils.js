(function() {
  window.breadth_first = function(start, range, test) {
    var d, i, obj, queue, seen, t, _i, _len, _ref;
    queue = [
      {
        d: 0,
        t: start
      }
    ];
    seen = {};
    seen[start.id] = true;
    _ref = _.range(30);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (queue.length === 0) {
        break;
      }
      obj = queue.shift();
      d = obj["d"];
      t = obj["t"];
      if (test(t)) {
        return t;
      }
      if (d >= range) {
        continue;
      }
      if (t.right()) {
        if (!seen[t.right().id]) {
          queue.push({
            d: d + 1,
            t: t.right()
          });
        }
      }
      if (t.up()) {
        if (!seen[t.up().id]) {
          queue.push({
            d: d + 1,
            t: t.up()
          });
        }
      }
      if (t.down()) {
        if (!seen[t.down().id]) {
          queue.push({
            d: d + 1,
            t: t.down()
          });
        }
      }
      if (t.left()) {
        if (!seen[t.left().id]) {
          queue.push({
            d: d + 1,
            t: t.left()
          });
        }
      }
      _(queue).each(function(t) {
        return seen[t.id] = true;
      });
    }
    return null;
  };
  window.distance = function(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  };
}).call(this);
