// ORM = OBJ RELATIONAL MODEL
module.exports.orm = orm => (request, response, next) => {
  request.orm = orm
  next()
}
