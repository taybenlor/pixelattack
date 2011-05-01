class View
  constructor: (@parent, options) ->
    @events = _([])
    @event_listeners = _({})
    @element = $('<div></div>')
    @children = _([])
    @parent.addChild(this) if @parent?
    
  #this should be implemented to do more than just return the element(things should update)
  render: -> @element
  
  addChild: (c) -> 
    @children.push c
  
  removeChild: (c) ->
    @children = _(@children.without c)
  
  hide: -> @element.addClass 'hidden'
  
  show: -> @element.removeClass 'hidden'
  
  remove: -> @element.remove()
  
  #this should be implemented to unlisten from events etc
  destroy: ->
    this.remove()
    
  #creates an event registry
  event: (name) ->
    @events.push(name)
    @event_listeners[name] = _([])
  
  #listens for an event
  listen: (name, fn) ->
    this.event(name) unless @event_listeners[name]
    @event_listeners[name].push(fn)
    
  unlisten: (name, fn) ->
    @event_listeners[name] = @event_listeners[name].without(fn)
    
  #fires an event
  fire: (name, obj) ->
    this.event(name) unless @event_listeners[name]
    done = @event_listeners[name].any _((fn)->
      fn.call(this, name, obj)
    ).bind(this)
    @parent.fire(name, obj) if @parent and not done
    
window.View = View