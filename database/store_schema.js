var Store = {
  length : 7,
  colum : ['id', 'name', 'place', 'time', 'tel', 'description', 'created'],
  attribute : ['integer primary key', 'text not null', 'text', 'text', 'text', 'text', 'DATETIME DEFAULT CURRENT_TIMESTAMP']
}
module.exports = Store
