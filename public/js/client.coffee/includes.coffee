include = (name) ->
  document.write "<script src=\"/js/client/#{name}.js\"></script>"

include 'models/model'
include 'models/map'
include 'models/tile'

include 'views/view'
include 'views/map_view'
include 'views/tile_view'