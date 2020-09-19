var Store = {
  length : 7,
  colum : ['id', 'name', 'place', 'menu', 'time', 'created', 'updated'],
  attribute : ['integer primary key', 'text not null', 'text', 'text', 'text', 'DATETIME', 'DATETIME']
}
module.exports = Store
