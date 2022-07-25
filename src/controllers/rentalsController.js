import connection from "../../database.js"
import dayjs from "dayjs"
import rentalsSchema from '../schemas/rentalsSchema.js'


let now = dayjs();
export async function getRentals(req, res){
  const queryCustomer = req.query.customerId
  const queryGame = req.query.gameId
  if(queryCustomer){
    try{  
      const {rows:rentals} = await connection.query(
        `
        SELECT rentals.*,
        to_json(customers) "customer",
        to_json(games) "game"
        FROM customers
        INNER JOIN rentals ON customers.id = rentals."customerId"
        INNER JOIN (SELECT
        games.*,
        categories.name as "categoryName"
        FROM games
        JOIN categories ON games."categoryId" = categories.id)
        AS games
        ON games.id = rentals."gameId"
        WHERE customers.id = $1;`,[queryCustomer])
         console.log(rentals)
        res.send(rentals).status(200)
      }catch(error){
        res.sendStatus(400)
      }
  }else if(queryGame){
    try{  
      const {rows:rentals} = await connection.query(
        `
        SELECT rentals.*,
        to_json(customers) "customer",
        to_json(games) "game"
        FROM rentals
        INNER JOIN customers ON customers.id = rentals."customerId"
        INNER JOIN (SELECT
        games.*,
        categories.name as "categoryName"
        FROM games
        JOIN categories ON games."categoryId" = categories.id)
        AS games
        ON games.id = rentals."gameId"
        WHERE game.id = $1;`,[queryGame])
         console.log(rentals)
        res.send(rentals).status(200)
      }catch(error){
        res.sendStatus(400)
      }
  }else{

  try{  
  const {rows:rentals} = await connection.query(
    `
    SELECT rentals.*,
    to_json(customers) "customer",
    to_json(games) "game"
    FROM rentals
    INNER JOIN customers ON customers.id = rentals."customerId"
    INNER JOIN (SELECT
    games.*,
    categories.name as "categoryName"
    FROM games
    JOIN categories ON games."categoryId" = categories.id)
    AS games
    ON games.id = rentals."gameId";`)
     console.log(rentals)
    res.send(rentals).status(200)
  }catch(error){
    res.sendStatus(400)
  }
  }
}
  export async function postRentals(req, res){
    const rental = req.body
    const validation = rentalsSchema.validate(rental)
    if(!validation) return res.sendStatus(400)
    const rentDate = now.format('YYYY-MM-DD').toString()
    try{
      const {rows:game} = await connection.query('SELECT * FROM games WHERE id=$1',[rental.gameId])
      const originalPrice = rental.daysRented * game[0].pricePerDay
     await connection.query(`INSERT INTO rentals ("customerId",
    "gameId",
    "rentDate",    
    "daysRented",             
    "returnDate",          
    "originalPrice",      
    "delayFee") 
      VALUES ($1,$2,$3,$4,$5,$6,$7);`, [rental.customerId, rental.gameId, rentDate, rental.daysRented, null, originalPrice, null])
      res.sendStatus(200);
    }catch(error){
      res.sendStatus(400)
    }
  }

  export async function postReturn(req, res){
    const gamereturn = req.params.id
    console.log(gamereturn)
    if(!gamereturn) return res.sendStatus(400)
    try{
      const returnDate = now
      console.log(returnDate)

      await connection.query('UPDATE rentals SET "returnDate"=$1 WHERE id=$2;', [returnDate, gamereturn])
           
      const {rows:rentDate} = await connection.query('SELECT "rentDate" FROM rentals WHERE id=$1;',[gamereturn])

      const {rows:daysRented} = await connection.query('SELECT "daysRented" FROM rentals WHERE id=$1;',[gamereturn])
      console.log(returnDate.diff(rentDate, "days"))
      res.sendStatus(200);
    }catch(error){
      res.sendStatus(400)
    }
  }