class IntroController extends Controller
  constructor: ->
    super
    
    @intro_view = new IntroView(null);
    
    @intro_view.listen 'click', _((name, event) ->
      this.play
    ).bind(this)
    
    $("#main").html(@intro_view.render())
    
  play: ->
    @intro_view = null
    window.game_controller = new GameController()
      
window.IntroController = IntroController