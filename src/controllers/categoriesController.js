import connection from "../../database.js"


export async function getCategories(req, res){
  try{
    const {rows:categories} = await connection.query('SELECT * FROM categories;')
    res.send(categories)
  }catch(error){
    res.sendStatus(400)
  }
  }

  export async function postCategories(req, res){
    const { name } = req.body;
    try{
      if (!name) return res.sendStatus(400)
      const {rows:repetido} = await connection.query('SELECT * FROM categories WHERE name=$1',[name])
      if(repetido.length) return res.sendStatus(409)
    await connection.query('INSERT INTO categories (name) VALUES ($1)', [name])
      res.sendStatus(201);
    }catch(error){
      res.sendStatus(400)
    }
  }


