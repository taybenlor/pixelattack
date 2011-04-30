class Map extends Model
  constructor: (width, height) ->
    super
    
    this.attr 'width', {default: width || 15}
    this.attr 'height', {default: height || 10}
    
    @tiles = _([])
    
    _(_.range(@width)).each _((x) ->
      _(_.range(@height)).each _((y)->
        @tiles.push new Tile(x, y)
      ).bind(this)
    ).bind(this)
    
window.Map = Map