var TemStore = {
  length : 8,
  colum : ['id', 'title', 'name', 'place', 'time', 'tel', 'description', 'created'],
  attribute : ['integer primary key', 'text not null', 'text not null', 'text', 'text', 'text', 'text', 'DATETIME DEFAULT CURRENT_TIMESTAMP']
}
module.exports = TemStore
