class GameController extends Controller
  constructor: ()->
    super
    window.ticks = Date.now()
    
    @game = new Game();
    @game_view = new GameView(null, @game);
    @map_view = new MapView(@game_view, @game.map);
    
    @game_view.listen 'click', _((name, event) ->
      this.buildTower(event.source.tile, 'default')
    ).bind(this)
    
    @game.listen 'finished', _(this.done).bind(this)
    
    $("#main").html(@game_view.render())
    
    tick = _(->
      window.ticks = Date.now()
      @game.update()
      _(tick).defer()
    ).bind(this)
    
    tick()
    
  buildTower: (tile, type) ->
    @game.build(tile, type)
    
  done: ->
    window.game_controller = null
    window.end_controller = new EndController(@game)
    
window.GameController = GameController