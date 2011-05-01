class EndView extends View
  constructor: (parent, @game) ->
    super

    @element = $ """
      <section class="intro">
        <h1><strong class="pixels">You Lose</strong></h1>
          
        <h1><strong class="pixels"> #{@game.score}pts </strong></h1>
        
        <button>Again?</button>
      </section>
      """
    
    @element.children('button').click _(->
      this.fire 'click', 
        source: this,
        details: ''
    ).bind(this)
  render: ->
    @element

window.EndView = EndView