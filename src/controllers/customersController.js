import connection from "../../database.js"
import {customersSchema, cpfSchema }from "../schemas/customersSchema.js"


export async function getCustomerById(req, res){
  const serach = req.params.id
  console.log(serach)
 
    try{
    const {rows:costumers} = await connection.query(
     `SELECT * FROM customers
      WHERE customers.cpf LIKE $1`, [serach + '%'])
    res.send(costumers)
   }catch(error){
    res.sendStatus(400)
  }
}
  export async function getCustomers(req, res){
      try{
      const {rows:games} = await connection.query(
       `SELECT * FROM customers`)
      res.send(games)
    }catch(error){
      res.sendStatus(400)
    }
  }

  export async function postCustomers(req, res){
    const  customer  = req.body
    const validation = customersSchema.validate(customer)
    console.log(validation)
    if(!validation) return res.sendStatus(400)
    try{
      console.log(customer)
      const {rows:repetido} = await connection.query('SELECT * FROM customers WHERE cpf=$1',[customer.cpf])
      if(repetido.length) return res.sendStatus(409)
      console.log(customer)
    await connection.query('INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)', [customer.name, customer.phone, customer.cpf, customer.birthday])
      res.sendStatus(201);
    }catch(error){
      res.sendStatus(400)
    }
  }
  export async function putCustomers(req, res){
    const  cpf = req.params.cpf
    console.log(cpf)
    const customer = req.body
    const validation = customersSchema.validate(customer)
    const cpfValidation = cpfSchema.validate(cpf)
    console.log(customer)
    if(!validation || !cpfValidation) return res.sendStatus(400)
    try{
      const {rows:updated} = await connection.query('SELECT * FROM customers WHERE cpf=$1',[cpf])
      if(!updated.length) return res.sendStatus(404)
    await connection.query('UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE cpf=$5;', [customer.name, customer.phone, customer.cpf, customer.birthday,cpf])
      res.sendStatus(200);
    }catch(error){
      res.sendStatus(400)
    }
  }

 