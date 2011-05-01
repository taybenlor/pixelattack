class Map extends Model
  constructor: (width, height) ->
    super
    
    this.attr 'width', {default: width || 15}
    this.attr 'height', {default: height || 10}
    
    @tiles = []
    
    _(_.range(@width)).each _((x) ->
      _(_.range(@height)).each _((y)->
        tile = new Tile(this, x, y)
        @tiles.push tile 
      ).bind(this)
    ).bind(this)
    
    _(10).times _( ->
      tile = @tiles[Math.floor(Math.random()*@tiles.length)]
      while tile.converted #it's already been converted
        tile = @tiles[Math.floor(Math.random()*@tiles.length)]
      tile.converted = true 
    ).bind(this)
    
  convertedTiles: ->
    _(@tiles).reject (tile) -> !tile.converted
  
  getTile: (x, y) ->
    return null if (x < 0) or (y < 0) or (x > @width) or (y > @height)
    @tiles[(x*@height) + y]
    
window.Map = Map