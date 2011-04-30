class Game extends Model
  constructor: ->
    @map = new Map()
    
    attr "score"
    
    @players = _([])
  
  addPlayer: (player) -> @players.push player
  
  removePlayer: (player) -> @players = @players.without player
  
  
window.Game = Game