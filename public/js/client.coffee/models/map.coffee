class Map extends Model
  constructor: (width, height) ->
    super
    
    this.attr 'width', {default: width || 15}
    this.attr 'height', {default: height || 10}
    
    @tiles = _([])
    
    _(_.range(@width)).each _.bind((x) ->
      _(_.range(@height)).each _.bind((y)->
        @tiles.push new Tile(x, y)
      , this)
    , this)
    
window.Map = Map