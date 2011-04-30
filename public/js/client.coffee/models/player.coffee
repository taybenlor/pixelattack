class Player extends Model
  constructor: (@name, @colour, @local) ->
    super
    
    @local = !!@local
    
    this.attr 'score', {default: 0}
    this.attr 'lives', {default: 0}
    this.attr 'money', {default: 100}
    
    @tiles = _([])
    
  join: (game) -> 
    @game = game
    @game.addPlayer this
    
  build: (tower, tile) ->
    return false if tower.cost() > @money
    if tile.place(tower)
      @money -= tower.cost()
      return true
    false
    
  