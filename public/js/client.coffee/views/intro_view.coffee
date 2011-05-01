class IntroView extends View
  constructor: (parent) ->
    super

    @element = $ """
      <article class="intro">
        <h1>
          Theres too many
          <strong class="pixies">PIXIES</strong>
          in
          <strong class="pixels">Pixel Town</strong>
        </h1>
        <h2>
          &mdash; by Ben Taylor
        </h2>
        
        <button>
          Play
        </button>
        
        <section class="story">
            <p>
              <blockquote>
                &#8220;Fairytales aren't cool any more. All these kids want computer games.&#8221;
              </blockquote>
              <em>&mdash; Major Corporal (of the Pixie Dust Initiative)</em>
            </p>
            <p>
              We've managed to take over a small section of Pixel Town to facilitate research. 
              As our smartest tactician it's your job to defend it. The pixels don't like
              us being here - they'll take any chance to get square. So be on the look out.
            </p>
            <h3>As per usual, it's dangerous to go alone! Take these Magic Mushrooms.</h3>
        </ul>
        
        <ul class="instructions">
          <li>
            <figure class="default tower">
            </figure>
          </li>
          <li>
            <figure class="default tower">
              </figure>          
          </li>
          <li>
            <figure class="default tower">
            </figure>
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