import connection from "../../database.js";

export async function verificaCategorias(req, res, next) {
   const categoryId = req.body.categoryId
   let {rows:categories} = await connection.query('SELECT id FROM categories;')
   categories = categories.map(value => value.id)
   res.locals.categoryExists = categories.includes(categoryId)
    next();
  }

  export async function verificaNomes(req, res, next) {
    const name = req.body.name
    let {rows:games} = await connection.query('SELECT name FROM games;')
    games = games.map(value => value.name)
    res.locals.nameExists = games.includes(name)
     next();
   }