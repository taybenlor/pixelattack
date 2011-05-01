window.breadth_first = (start, range, test) ->
  queue = [{d: 0, t: start}]
  seen = {}
  seen[start.id] = true
  
  for i in _.range(30)
    break if queue.length == 0
    obj = queue.shift()
    d = obj["d"]
    t = obj["t"]
    return t if test(t)
    
    continue if d >= range
    
    if t.right()
      queue.push({d: d+1, t:t.right()}) unless seen[t.right().id]
    if t.up()
      queue.push({d: d+1, t:t.up()}) unless seen[t.up().id]
    if t.down()
      queue.push({d: d+1, t:t.down()}) unless seen[t.down().id]
    if t.left()
      queue.push({d: d+1, t:t.left()}) unless seen[t.left().id]
    
    _(queue).each (t) -> seen[t.id] = true
  return null
  
window.distance = (a, b) -> Math.abs(a.x - b.x) + Math.abs(a.y - b.y) #manhattan!