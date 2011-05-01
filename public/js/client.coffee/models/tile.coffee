TIME_TO_CONVERT = 20000

class Tile extends Model  
  constructor: (@map, @x, @y) ->
    super
    
    @placed = null
    this.attr 'thing', {default: null}
    this.attr 'converted', {default: false}
    
    @thing = null
    
  occupied: -> !!@thing
    
  place: (thing) ->
    return false if @thing?
      
    @thing = thing
    @placed = ticks
    thing
  
  clear: ->
    @placed = null
    thing = @thing
    @thing = null
    thing
    
  update: ->
    return unless @placed
    return unless @thing instanceof Enemy
    @converted = true if (ticks - @placed) > TIME_TO_CONVERT
    
  left: ->
    return @_left if @_left
    @_left = @map.getTile(@x-1, @y)
  
  right: ->
    return @_right if @_right
    @_right = @map.getTile(@x+1, @y)

  up: ->
    return @_up if @_up
    @_up = @map.getTile(@x, @y-1)
  
  down: ->
    return @_down if @_down  
    @_down = @map.getTile(@x, @y+1)
  
window.Tile = Tile