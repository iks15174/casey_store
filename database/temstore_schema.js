var TemStore = {
  length : 8,
  colum : ['id', 'title', 'name', 'place', 'tel', 'description', 'created', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun', 'lat', 'lng'],
  attribute : ['integer primary key', 'text not null', 'text not null', 'text', 'text', 'text', 'DATETIME DEFAULT CURRENT_TIMESTAMP', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'DECIMAL(8,6)', 'DECIMAL(9,6)']
}
module.exports = TemStore
