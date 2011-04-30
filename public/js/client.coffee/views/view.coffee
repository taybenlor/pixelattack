class View
  constructor: (parent, options) ->
    @parent = parent
    @element = $('<div></div>')
    
  render: -> @element
  
window.View = View