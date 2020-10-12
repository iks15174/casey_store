var TemStore = {
  length : 8,
  colum : ['id', 'title', 'name', 'place', 'tel', 'description', 'created', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun'],
  attribute : ['integer primary key', 'text not null', 'text not null', 'text', 'text', 'text', 'DATETIME DEFAULT CURRENT_TIMESTAMP', 'text', 'text', 'text', 'text', 'text', 'text', 'text']
}
module.exports = TemStore
