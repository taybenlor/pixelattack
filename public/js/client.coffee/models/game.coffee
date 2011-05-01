DIFF_INCREASE = 1.1
DIFF_INTERVAL = 30000

WAVE_PERCENTAGE = 0.1

LOSS_DENSITY_COUNT = 145 

class Game extends Model
  constructor: ->
    super
    @map = new Map()
    
    this.attr "score", {default: 0}
    this.attr "lives", {default: 0}
    this.attr "money", {default: 10}
    this.attr "attack_interval", {default: 2000}
    this.attr "enemy_count", {default: 0}
    this.attr "finished", {default: false}
    
    @last_enemy = null
    
    @enemies = _([])
    @towers = _([])
    
    @difficulty = 1
    
    @last_difficulty = ticks
  
  addEnemy: -> 
    converted = @map.convertedTiles()
    
    number = Math.max(Math.floor(converted.length * WAVE_PERCENTAGE * @difficulty), 1)
    
    _(number).times _(->
      type =  Enemy.types[Math.floor(Math.random() * 3)]
      tile = converted[Math.floor(Math.random() * converted.length)]
      unless tile.occupied()
        enemy = new Enemy(tile, type, Enemy.health(type) * @difficulty)
      
        @enemies.push enemy
      
        enemy.listen 'destroyed', _((old_val, new_val) ->
          this.destroyEnemy(enemy) if new_val
          @enemy_count -= number
        ).bind(this)
    ).bind(this)
    
    @enemy_count += number
    @last_enemy = ticks
  
  destroyEnemy: (enemy) ->
    @enemies = _(@enemies.without(enemy))
    if enemy.health <= 0
      @score += (enemy.value() * 100)
      @money += enemy.value()
      
  destroyTower: (tower) ->
    @towers = _(@towers.without(tower))
  
  build: (tile, type) ->
    return false if Tower.cost(type) > @money
    return false if tile.converted
    return false if tile.occupied()
    tower = new Tower(tile, type)
    if tile.place(tower)
      @money -= Tower.cost(type)
      console.log(@money)
      @towers.push(tower)
      tower.listen 'destroyed', _((old_val, new_val) ->
        this.destroyTower(tower) if new_val
      ).bind(this)
      return true
    false
  
  update: ->
    @last_enemy = ticks unless @last_enemy?
    
    this.addEnemy() if (ticks - @last_enemy) > @attack_interval
    
    @enemies.each _((enemy) ->
      enemy.update()
    ).bind(this)
    
    @towers.each _((tower) ->
      tower.update()
    ).bind(this)
    
    if (ticks - @last_difficulty) > DIFF_INTERVAL
      @difficulty *= DIFF_INCREASE
      @last_difficulty = ticks
      @score += 250
    
    @last_tick = ticks
    
  
window.Game = Game