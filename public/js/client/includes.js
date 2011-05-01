(function() {
  var include;
  include = function(name) {
    return document.write("<script src=\"/js/client/" + name + ".js\"></script>");
  };
  include('lib/utils');
  include('controllers/controller');
  include('controllers/game_controller');
  include('controllers/intro_controller');
  include('controllers/end_controller');
  include('models/model');
  include('models/map');
  include('models/tile');
  include('models/tower');
  include('models/game');
  include('models/enemy');
  include('views/view');
  include('views/map_view');
  include('views/tile_view');
  include('views/tower_view');
  include('views/game_view');
  include('views/enemy_view');
  include('views/intro_view');
  include('views/end_view');
}).call(this);
