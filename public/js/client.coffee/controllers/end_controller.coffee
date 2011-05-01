class EndController extends Controller
  constructor: (@game) ->
    super
  
    @end_view = new EndView(null, @game);

    @end_view.listen 'click', _((name, event) ->
      this.play()
    ).bind(this)

    $("#main").html(@end_view.render())

  play: ->
    @end_view = null
    window.game_controller = new GameController()
      
window.EndController = EndController