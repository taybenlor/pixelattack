class Model
  @id: ->
    @_id = 1 unless @_id?
    @_id += 1
    @_id-1
  
  constructor: ->
    @id = Model.id()
    @attributes = _([])
    
  attr: (name, options) ->
    options = options || {
      default: null
    }
    
    this["_#{name}"] = options["default"]
    this["_#{name}_listeners"] = _([])
    
    @attributes.push name
    
    if options.get?
      this.__defineGetter__ name, _.bind(options.get, this)
    else
      this.__defineGetter__ name, -> this["_#{name}"]
    
    set = null
    if options.set?
      set = _.bind(options.set, this)
    else
      set = (y) ->
        this["_#{name}"] = y
    
    this.__defineSetter__ name, (y) ->
      oldval = this[name]
      set.call(this, y)
      newval = this[name]
      this["_#{name}_listeners"].each((fn) -> fn(oldval, newval))

  listen: (property, fn) ->
    this["_#{property}_listeners"].push fn      
      
    
window.Model = Model
    