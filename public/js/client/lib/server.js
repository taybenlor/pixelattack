(function() {
  var breadth_first, distance;
  breadth_first = function(start, range, test) {
    var d, obj, queue, seen, t;
    queue = [
      {
        d: 0,
        t: start
      }
    ];
    seen = {};
    seen[start.id] = true;
    while (queue.length) {
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
  distance = function(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  };
}).call(this);
