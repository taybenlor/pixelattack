class EnemyView extends View
  constructor: (parent, @enemy) ->
    super
    
    @element = $ """
      <figure
      class="enemy #{@enemy.type} on-converted"
      style="-webkit-transform: translateX(#{@enemy.tile.x * 50}px) translateY(#{@enemy.tile.y * 50}px); z-index: #{@enemy.tile.y+10}">
      </figure>
      """
    
    @enemy.listen "destroyed", _( (old_val, new_val) ->
      if new_val
        @parent.removeChild this
        @element.remove()
    ).bind(this)
    
    @enemy.listen "health", _( (old_val, new_val) ->
      @element.addClass('hit')
      _(_(-> @element.removeClass('hit')).bind(this)).delay(100)
      
      p = (new_val/@enemy.starting_health)
      @element.addClass('damaged') if p < 0.66
      @element.addClass('severely') if p < 0.33
    ).bind(this)
    
    @enemy.listen "converting", _( (old_val, new_val)->
      @element.addClass('converting') if new_val
    
    ).bind(this)
    
  render: ->
    @element.css('-webkit-transform', "translateX(#{@enemy.tile.x * 50}px) translateY(#{@enemy.tile.y * 50}px)")
    @element.css('z-index', "#{@enemy.tile.y}")
    if @enemy.tile.converted
      @element.addClass('on-converted')
    else
      @element.removeClass('on-converted')
    @element

window.EnemyView = EnemyView