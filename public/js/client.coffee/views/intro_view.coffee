class IntroView extends View
  constructor: (parent) ->
    super

    @element = $ """
      <article class="intro">
        <h1>
          Theres too many
          <strong>Pixies</strong>
          in
          <strong>Pixel Town</strong>
        </h1>
        <h2>
          &mdash; by Ben Taylor
        </h2>
        
        <button>
          Play
        </button>
        
        <ul class="story">
          <li>
            <quote>
              Fairytales aren't cool any more. All these kids want computer games.
            </quote>
            <h2>
              &mdash; Major Corporal (of the Pixie Dust Initiative)
            </h2>
          </li>
          <li>
            <p>
              We've managed to take over a small section of Pixel Town to facilitate research. 
              As our smartest tactician it's your job to defend it. The pixels don't like
              us being here - they'll take any chance to get square. So be on the look out.
            </p>
          </li>
          <li>
            <h3>As per usual, it's dangerous to go alone! Take these Magic Mushrooms.</h3>
          </li>
        </ul>
        
        <ul class="instructions">
          <li>
            <h3>The pixels have come to attack</h3>
            <img src="/img/pixels.png">
          </li>
          <li>
            <h3>Place Mushrooms to fend them off</h3>
            <img src="/img/mushrooms.png">
          </li>
          <li>
            <h3>Survive as long as you can</h3>
            <img src="/img/survive.png">
          </li>
        </ul>
      </article>
      """
    
    @element.children('button').click _(->
      this.fire 'click', 
        source: this,
        details: ''
    ).bind(this)
    
  render: ->
    @element

window.IntroView = IntroView