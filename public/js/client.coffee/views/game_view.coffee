class GameView extends View
  constructor: (parent, @game) ->
    super

    @element = $ """
      <section class="game">

      </section>
      """
    
    @game.listen 'money', (old_val, new_val) ->
      $("#money").html(new_val)
    
    @game.listen 'score', (old_val, new_val) ->
      $("#score").html(new_val)
    
  render: ->
    @element.html """
      <ul class="stats">
        <li id="score">#{@game.score}</li>
        <li id="money">#{@game.money}</li>
      </ul>
    """
    
    @children.each _((v) ->
      @element.append v.render()
    ).bind(this)
    @element

window.GameView = GameView