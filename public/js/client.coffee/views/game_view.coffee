class GameView extends View
  constructor: (parent, @game) ->
    super

    @element = $ """
      <section class="game">

      </section>
      """
    
    

  render: ->
    @element.html ""
    @children.each _((v) ->
      @element.append v.render()
    ).bind(this)
    @element

window.GameView = GameView