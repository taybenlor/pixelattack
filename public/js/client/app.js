(function() {
  var map, map_view;
  log('Loading...');
  map = new Map();
  map.tiles.first();
  map_view = new MapView(map);
  $("#main").html(map_view.render());
  log('Loaded');
}).call(this);
