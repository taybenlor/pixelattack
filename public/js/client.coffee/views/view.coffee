class View
  constructor: (@parent, options) ->
    @events = _([])
    @element = $('<div></div>')
    @children = _([])
    
  #this should be implemented to do more than just return the element(things should update)
  render: -> @element
  
  addChild: (c) -> @children.push c
  
  removeChild: (c) -> @children = @children.without c
  
  hide: -> @element.addClass 'hidden'
  
  show: -> @element.removeClass 'hidden'
  
  remove: -> @element.remove()
  
  #this should be implemented to unlisten from events etc
  destroy: ->
    this.remove()
    
  #creates an event registry
  event: (name) ->
    @parent.event(name) if @parent
    @events.push(name)
    this["_event_#{name}_listeners"] = _([])
  
  #listens for an event
  listen: (name, fn) ->
    this["_event_#{name}_listeners"].push(fn)
    
  unlisten: (name, fn) ->
    this["_event_#{name}_listeners"] = this["_event_#{name}_listeners"].without(fn)
    
  #fires an event
  fire: (name, obj) ->
    done = this["_event_#{name}_listeners"].any _((fn)->
      fn.call(this, name, obj)
    ).bind(this)
    @parent.fire(name, obj) if @parent and not done
    
window.View = View