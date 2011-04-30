class TileView extends View
  constructor: (@tile, @width, @height) ->
    super
    
    @width = 50 unless @width?
    @height = 50 unless @height?
    
    @element = $ """
      <figure data-x="#{@tile.x}" data-y="#{@tile.y}"
        class="tile" 
        style="width:#{@width}px;height:#{@height}px;top:#{@tile.y*@height}px;left:#{@tile.x*@width}px">
      </figure>"""
    
    @tile.listen('thing', _.bind(-> 
      this.render
    , this))
    
  render: ->
    @element.html ""
    
window.TileView = TileView