
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool = mysql.createPool({
    //TRADITIONAL WAY
    // host: 'localhost',
    // user: 'root',
    // password: '123456789',
    // database: 'notes_app',

    //ENVIRONMENT VARIABLE WAY
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

export async function getNotes() {
    const result = await pool.query('SELECT * FROM notes')
    //one way is this but by this actually we are getting an array of arrays so 
    //we can use destructuring to get the first element of the array into the rows variable
    const rows = result[0]
    return rows
    //another way is this
    //const [rows]=await pool.query('SELECT * FROM notes')
}

export async function getNoteById(id) {
    //THIS IS A SECURE WAY OF GETTING THE DATA FROM THE DATABASE BY USING THE
    //? SIGN IN THE QUERY AND THEN PASSING THE ID AS AN ARRAY IN THE SECOND 
    //PARAMETER OF THE QUERY FUNCTION 
    //THIS IS CALLED PREPARED STATEMENT
    const [rows] = await pool.query('SELECT * FROM notes WHERE id=?', [id])
    return rows[0]  
    //THE TRADIOTIONAL WAY OF GETTING THE DATA FROM THE DATABASE IS
    // const result = await pool.query('SELECT * FROM notes WHERE id=${id}')
}

export async function createNote(title,content){
    const [result] = await pool.query('INSERT INTO notes(title,content) VALUES(?,?)',[title,content])
    const id=result.insertId

    return getNoteById(id)
}

//const notes = await getNotes()
//const notes = await getNoteById(15)
// console.log(notes)
// console.log(note)
// const notes=await createNote('My third note','This is the content of my third note')
// console.log(notes)