class GameView extends View
  constructor: (parent, @game) ->
    super

    @element = $ """
      <section class="game">

      </section>
      """
    
    @game.listen 'money', (old_val, new_val) ->
      $("#money").html("$#{new_val}")
    
    @game.listen 'score', (old_val, new_val) ->
      $("#score").html("#{new_val}pts")
      
    @game.listen 'enemy_count', (old_val, new_val) ->
      $("#density").html("#{new_val}/120")
    
  render: ->
    @element.html """
      <ul class="stats">
        <li id="money">$#{@game.money}</li>
        <li id="score">#{@game.score}pts</li>
        <li id="density">#{@game.enemy_count}/140</li>
      </ul>
    """
    
    @children.each _((v) ->
      @element.append v.render()
    ).bind(this)
    @element

window.GameView = GameView