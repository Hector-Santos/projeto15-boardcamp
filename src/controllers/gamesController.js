import connection from "../../database.js"
import gamesSchema from "../schemas/gamesSchema.js"


export async function getGames(req, res){
  const serach = req.query.name
  if(Object.keys(serach).length){
    try{
    const {rows:games} = await connection.query(
     `SELECT games.*, categories.name
      as "categoryName"
      FROM games
      JOIN categories
      ON "categoryId" = categories.id
      WHERE games.name ILIKE $1`, [serach + '%'])
    res.send(games)
  }catch(error){
    res.sendStatus(400)
  }
  }else{
  try{
    const {rows:games} = await connection.query(
    `SELECT games.*, categories.name 
    as "categoryName" 
    FROM games
    JOIN categories 
    ON "categoryId" = categories.id;`)
    res.send(games)
  }catch(error){
    res.sendStatus(400)
  }
      }
  }

  export async function postGames(req, res){
    if(!res.locals.categoryExists) return res.sendStatus(400)
    if(res.locals.nameExists) return res.sendStatus(409)
    const  game  = req.body
    const validation = gamesSchema.validate(game)
    if(!validation) return res.sendStatus(400)
    try{
      const {rows:repetido} = await connection.query('SELECT * FROM games WHERE name=$1',[game.name])
      if(repetido.length) return res.sendStatus(409)
    await connection.query('INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)', [game.name, game.image, game.stockTotal, game.categoryId, game.pricePerDay])
      res.sendStatus(201);
    }catch(error){
      res.sendStatus(400)
    }
  }

 