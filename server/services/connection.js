import mysql from 'mysql'

const dbUser = process.env.DATABASE_USERNAME
const dbPass = process.env.DATABASE_PASSWORD

const db = mysql.createConnection({
    host: 'localhost',
    user: dbUser,
    password: dbPass,
    database: process.env.DATABASE_URL
})

export default db