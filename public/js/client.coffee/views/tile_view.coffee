class TileView extends View
  constructor: (parent, @tile, @width, @height) ->
    super
    
    this.event 'click'
    
    @width = 50 unless @width?
    @height = 50 unless @height?
    
    @element = $ """
      <figure data-x="#{@tile.x}" data-y="#{@tile.y}"
        class="tile" 
        style="width:#{@width}px;height:#{@height}px;top:#{@tile.y*@height}px;left:#{@tile.x*@width}px">
      </figure>"""
    
    @element.click _(->
      log 'clicked!'
      this.fire 'click', 
        source: this,
        details: ''
    ).bind(this)
    
    @tile.listen 'thing', _(-> 
      this.render
    ).bind(this)
    
  render: ->
    @element.html ""
    @children.each _((v) ->
      @element.append(v.render())
    ).bind(this)
    @element
    
window.TileView = TileView