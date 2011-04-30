class Tower extends Model
  constructor: (type) ->
    type = "default" unless type
    
    this.attr "type", {default: type}
    this.attr "attacking", {default: null}
    
    
window.Tower = Tower