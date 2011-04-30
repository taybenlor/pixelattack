class TowerView extends View
  constructor: (@tower) ->
    super
    
    @element = $ """
      <figure class="tower #{@tower.type}">
      </figure>
      """
  
  render: ->
    @element
    