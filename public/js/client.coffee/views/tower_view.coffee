class TowerView extends View
  constructor: (parent, @tower) ->
    super
    
    @element = $ """
      <figure class="tower #{@tower.type}" style="z-index: #{@tower.tile.y+10}">
      </figure>
      """
    
    @tower.listen "attacking", _((old_val, new_val) ->
      if new_val
        @element.addClass('attacking')
      else
        @element.removeClass('attacking')
    ).bind(this)
  
  render: ->
    @element

window.TowerView = TowerView