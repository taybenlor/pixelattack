class TowerView extends View
  constructor: (parent, @tower) ->
    super
    
    @element = $ """
      <figure class="tower #{@tower.type}">
      </figure>
      """
  
  render: ->
    @element

window.TowerView = TowerView