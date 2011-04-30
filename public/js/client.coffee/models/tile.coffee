class Tile extends Model  
  constructor: (@x, @y) ->
    super
    
    this.attr 'thing'

  place: (thing) ->
    return false if @thing?
    @thing = thing
  
  clear: ->
    thing = @thing.leave
    @thing = null
    thing
    
  
  
window.Tile = Tile