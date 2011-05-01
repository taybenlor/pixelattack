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
      this.fire 'click', 
        source: this,
        details: ''
    ).bind(this)
    
    @thing_view = null
    
    @tile.listen 'thing', _((old_val, new_val)-> 
      this.children = _([])
      old = @thing_view
      if new_val instanceof Tower
        @thing_view = new TowerView(this, new_val)
        this.render()
      else if new_val instanceof Enemy
        @thing_view = @parent.enemy_views[new_val.id]
        
        unless @thing_view
          @thing_view = new EnemyView(parent, new_val)
          @parent.enemy_views[new_val.id] = @thing_view
          @parent.element.append(@thing_view.element)
        else
          @thing_view.render()
        
    ).bind(this)
    
    @converted_around = {}
    
    @force_render = _((old_val, new_val) ->
      this.render() 
    ).bind(this)
    
    @tile.listen 'converted', @force_render
    @tile.right()?.listen 'converted', @force_render 
    @tile.left()?.listen 'converted', @force_render 
    @tile.up()?.listen 'converted', @force_render 
    @tile.down()?.listen 'converted', @force_render 
    
  render: ->
    if @tile.converted
      @element.removeClass('right')
      @element.removeClass('left')
      @element.removeClass('up')
      @element.removeClass('down')
      @element.addClass('converted')
      
      allowed = []
      allowed.push 'right' if @tile.right()? and !@tile.right().converted
      allowed.push 'left' if @tile.left()? and !@tile.left().converted
      allowed.push 'down' if @tile.down()? and !@tile.down().converted
      allowed.push 'up' if @tile.up()? and !@tile.up().converted
      
      _(allowed).each _((classname) -> @element.addClass(classname)).bind(this) 
      
      @element.addClass('top') if !@tile.up()
      @element.addClass('bottom') if !@tile.down()
      
    @element.html ""
    @children.each _((v) ->
      @element.append(v.render())
    ).bind(this)
    @element
    
window.TileView = TileView