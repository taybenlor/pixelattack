(function() {
  var IntroView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  IntroView = (function() {
    __extends(IntroView, View);
    function IntroView(parent) {
      IntroView.__super__.constructor.apply(this, arguments);
      this.element = $("<article class=\"intro\">\n  <h1>\n    Theres too many\n    <strong>Pixies</strong>\n    in\n    <strong>Pixel Town</strong>\n  </h1>\n  <h2>\n    &mdash; by Ben Taylor\n  </h2>\n  \n  <button>\n    Play\n  </button>\n  \n  <ul class=\"story\">\n    <li>\n      <quote>\n        Fairytales aren't cool any more. All these kids want computer games.\n      </quote>\n      <h2>\n        &mdash; Major Corporal (of the Pixie Dust Initiative)\n      </h2>\n    </li>\n    <li>\n      <p>\n        We've managed to take over a small section of Pixel Town to facilitate research. \n        As our smartest tactician it's your job to defend it. The pixels don't like\n        us being here - they'll take any chance to get square. So be on the look out.\n      </p>\n    </li>\n    <li>\n      <h3>As per usual, it's dangerous to go alone! Take these Magic Mushrooms.</h3>\n    </li>\n  </ul>\n  \n  <ul class=\"instructions\">\n    <li>\n      <h3>The pixels have come to attack</h3>\n      <img src=\"/img/pixels.png\">\n    </li>\n    <li>\n      <h3>Place Mushrooms to fend them off</h3>\n      <img src=\"/img/mushrooms.png\">\n    </li>\n    <li>\n      <h3>Survive as long as you can</h3>\n      <img src=\"/img/survive.png\">\n    </li>\n  </ul>\n</article>");
      this.element.children('button').click(_(function() {
        return this.fire('click', {
          source: this,
          details: ''
        });
      }).bind(this));
    }
    IntroView.prototype.render = function() {
      return this.element;
    };
    return IntroView;
  })();
  window.IntroView = IntroView;
}).call(this);
