class GameController extends Controller
  constructor: (@server)->
    super
    
    @game = new Game();
    @game_view = new GameView(null, @game);

    map_view.listen 'click', (name, event) ->
      tower = new Tower()
      event.source.addChild(new TowerView(event.source, tower)) if event.source.tile.place(tower)
      event.source.render()

    $("#main").html(@game_view.render())
    
window.GameController = GameController