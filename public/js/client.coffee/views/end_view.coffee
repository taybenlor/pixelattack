class EndView extends View
  constructor: (parent) ->
    super

    @element = $ """
      <section class="intro">

      </section>
      """
    
  render: ->
    @element

window.EndView = EndView