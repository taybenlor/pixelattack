DAMAGE =
  default: 0.2
  heavy: 0.0
  fast: 0.1
  
HEALTH =
  default: 20
  heavy: 50
  fast: 30
  
SPEED =
  default: 3000
  heavy: 5000
  fast: 1000

VALUE =
  default: 1 
  heavy: 2
  fast: 2
  
CONVERT_TIME = 6000

class Enemy extends Model
  constructor: (tile, type, health) ->
    super

    type = "default" unless type
    

    health = HEALTH[@type] unless health
    
    @starting_health = health
    
    this.attr "type", {default: type}
    this.attr "attacking", {default: false}
    this.attr "hit", {default: false}
    this.attr "converting", {default: false}
    this.attr "tile", {default: tile}
    this.attr "destroyed", {default: false}
    this.attr "health", {default: health}
    
    @tile.place(this)
    
    @moved_at = ticks

  damage: (amount) ->
    @health -= amount
    this.destroy() if @health <= 0 

  alive: -> 
    @health > 0

  attack: (tile) -> 
    @attacking = true
    tile.thing?.damage(DAMAGE[@type])

  stopAttacking: ->
    @attacking = null
    
  leaveTo: (tile) ->
    @tile.clear()
    @tile = tile
    @tile.place(this)
    
  move: ->
    @moved_at = ticks
    if @type == "heavy"
      unless @target
        @target = breadth_first(@tile, 15, (t) -> !t.converted)
      
      if @target == @tile
        return this.startConverting()

      if @target
        if @target.x < @tile.x and @tile.left() and !@tile.left().occupied()
          return this.leaveTo(@tile.left())
        else if @target.x > @tile.x and @tile.right() and !@tile.right().occupied()
          return this.leaveTo(@tile.right())
        else if @target.y > @tile.y and @tile.down() and !@tile.down().occupied()
          return this.leaveTo(@tile.down())
        else if @target.y < @tile.y and @tile.up() and !@tile.up().occupied()
          return this.leaveTo(@tile.up())
        else
          @target = null
      
    if @type == "fast"
      if !@target or !(@target.thing instanceof Tower)
        @target = breadth_first(@tile, 15, (t) -> t.thing instanceof Tower)
      
      if @target
        if distance(@target, @tile) <= 1
          return this.attack(@target)
        else if @target.x < @tile.x and @tile.left() and !@tile.left().occupied()
          return this.leaveTo(@tile.left())
        else if @target.x > @tile.x and @tile.right() and !@tile.right().occupied()
          return this.leaveTo(@tile.right())
        else if @target.y > @tile.y and @tile.down() and !@tile.down().occupied()
          return this.leaveTo(@tile.down())
        else if @target.y < @tile.y and @tile.up() and !@tile.up().occupied()
          return this.leaveTo(@tile.up())
        else
          @target = null
    
    #default algorithm if all else fails
    if @tile.x == 0 and !@tile.converted
      this.startConverting()
    else if @tile.left() and @tile.left().converted and !@tile.converted
      this.startConverting()
    else if @tile.left() and !@tile.left().converted and !@tile.left().occupied()
      this.leaveTo(@tile.left())
    else if @tile.up() and !@tile.up().converted and !@tile.up().occupied()
      this.leaveTo(@tile.up())
    else if @tile.down() and !@tile.down().converted and !@tile.down().occupied()
      this.leaveTo(@tile.down())
    else if @tile.right() and !@tile.right().converted and !@tile.right().occupied()
      this.leaveTo(@tile.right())
    
    #do nothing :(
  
  destroy: ->
    @destroyed = true
    @tile.clear()
  
  startConverting: ->
    @converting = true
    @started_converting = ticks
  
  convert: ->
    @tile.converted = true
    this.destroy()
    
  update: ->
    if @converting
      this.convert() if ((ticks - @started_converting) > CONVERT_TIME)
    else if (ticks - @moved_at) > SPEED[@type]
      this.move()
      
  value: -> VALUE[@type]
  
  @types: ["default", "heavy", "fast"]
  
  @health: (type) -> HEALTH[type] 

window.Enemy = Enemy