class MapView extends View
  constructor: (@map, @width, @height) ->
    super
    
    @width = 750 unless @width?
    @height = 500 unless @height?
    
    @element = $ """
      <figure style="width:#{@width}px;height:#{@height}px" class="map">
        
      </figure>
      """
    @tiles = _([])
    
    @map.tiles.each _.bind((tile) ->
      @tiles.push new TileView(tile)
    , this)
    
  render: ->
    @element.html ""
    @tiles.each _.bind((tile) ->
      @element.append tile.render()
    , this)
    @element
    
window.MapView = MapView