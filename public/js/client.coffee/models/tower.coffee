COST = 
  default: 5
  cannon: 10
  area: 10
  
DAMAGE =
  default: 2
  cannon: 10
  area: 1
  
HEALTH =
  default: 100
  cannon: 150
  area: 75

RANGE =
  default: 2
  cannon: 5
  area: 1

RELOAD =
  default: 500
  cannon: 5000
  area: 100

class Tower extends Model
  constructor: (@tile, @type) ->
    super
    
    @type = "default" unless @type
    
    this.attr "attacking", {default: false}
    this.attr "health", {default: HEALTH[@type]}
    this.attr "destroyed", {default: false}
    
    @last_attack = ticks
  
  attack: ->
    @last_attack = ticks
    if @type == "default"
      target = breadth_first(@tile, RANGE[@type], (t) -> t.thing instanceof Enemy)
      if target and target.thing
        @attacking = true
        target.thing.damage(DAMAGE[@type])
    else if @type == "area"
      @attacking = true
      @tile.up()?.thing?.damage(DAMAGE[@type])
      @tile.left()?.thing?.damage(DAMAGE[@type])
      @tile.down()?.thing?.damage(DAMAGE[@type])
      @tile.right()?.thing?.damage(DAMAGE[@type])
    else if @type == "cannon"
      @attacking = true
      t = @tile.right()
      for i in _.range(RANGE[@type])
        break unless t
        t.thing?.damage(DAMAGE[@type])
        t = t.right()
      
  damage: (amount) -> 
    @health -= amount
    @buildage = @health/HEALTH[@type]
  
  alive: -> @health > 0
    
  update: ->
    @attacking = false if @attacking
    this.attack() if (ticks - @last_attack) > RELOAD[@type]
    
  @cost: (type) -> COST[type]
  
window.Tower = Tower