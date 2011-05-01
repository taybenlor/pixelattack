class EndController extends Controller
  constructor: ->
    super
  
  restart: ->
    window.game_controller = new GameController()
      
window.EndController = EndController