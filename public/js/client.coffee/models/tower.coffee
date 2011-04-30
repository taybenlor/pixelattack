COSTS = 
  default: 5
  slow: 10
  area: 10
  
DAMAGE =
  default: 0.2
  slow: 0.0
  area: 0.1
  
HEALTH =
  default: 100
  slow: 75
  area: 150

BUILDRATE = 
  default: 0.01
  slow: 0.02
  area: 0.005
  
RANGE =
  default: 5
  slow: 1
  area: 3

class Tower extends Model
  constructor: (@creator, type) ->
    super
    
    type = "default" unless type
    
    this.attr "type", {default: type}
    this.attr "attacking", {default: null}
    this.attr "buildage", {default: 0}
    this.attr "built", {default: false}
    this.attr "health", {default: HEALTH[@type]}
  
  cost: -> COSTS[@type]
  
  build: (ticks) ->
    @buildage = _([1.0, ticks*BUILDRATE[@type]]).min
    @built = @buildage >= 1.0
  
  damage: (amount) -> 
    @health -= amount
    @buildage = @health/HEALTH[@type]
  
  alive: -> @health > 0
  
  attack: (map, tile) -> 
    map.nearestWithin(Enemy, tile, RANGE[@type])
    
    
window.Tower = Tower