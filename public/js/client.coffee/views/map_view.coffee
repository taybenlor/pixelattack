class MapView extends View
  constructor: (parent, @map, @width, @height) ->
    super
    
    @width = 750 unless @width?
    @height = 500 unless @height?
    
    @element = $ """
      <figure style="width:#{@width}px;height:#{@height}px" class="map">
        
      </figure>
      """
      
    @enemy_views = {}
    
    _(@map.tiles).each _((tile) ->
      this.addChild(new TileView(this, tile))
    ).bind(this)
    
  render: ->
    @element.html ""
    @children.each _((v) ->
      @element.append v.render()
    ).bind(this)
    @element
    
window.MapView = MapView