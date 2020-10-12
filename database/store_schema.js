var Store = {
  length : 7,
  colum : ['id', 'name', 'place', 'tel', 'description', 'created', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun'],
  attribute : ['integer primary key', 'text not null unique', 'text', 'text', 'text', 'DATETIME DEFAULT CURRENT_TIMESTAMP', 'text', 'text', 'text', 'text', 'text', 'text', 'text']
}
module.exports = Store
