class Action
  constructor: (@method, @arguments) ->
    @ticks = window.server.ticks
    
  do: -> 
    window.game_controller[@method].apply(window.game_controller, @arguments)
  
  toJSON: ->
    {
      ticks: @ticks
      method: @method
      arguments: (JSON.stringify(arg) for arg in @arguments)
    }
  
  @fromJSON: (str) ->
    obj = JSON.parse(str)
    new Action(obj.id, obj.method, obj.arguments)

TICK_TIME = 100
class Server
  constructor: ->
    @last_time = Date.now()
    @ticks = 0
    @to_send = _([])
    @to_work = _([])
  
  build: ->
    return unless @ticks > BUILD_TIME 
    now = Date.now()
    @received = (Action.fromJSON(i.toJSON()) for i in @to_send)
    @to_work = _(@received).sortBy (el) -> -1*el.ticks
    while @to_work.length
      this.dequeue()
    
    @ticks = now - @ticks
    
  tick: ->
    now = Date.now()
    @ticks += (Date.now() - @last_time)
    @last_time = now
    
  queue: (action) ->
    @to_send.push action
    
  dequeue: ->
    @to_work.pop().do()
    
  @run: ->
    server = new Server()
    do_stuff = _(->
      server.tick
      server.build
      _(arguments.calee).defer()
    ).defer()
    server

log('Loading...');
window.server = Server.run()
window.game_controller = new GameController(window.server)
log('Loaded');