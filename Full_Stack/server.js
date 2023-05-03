const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const port = 4175
app.use(express.json())
const cors = require('cors')
app.use(cors())
const product_router = require('./routes/product_routes')
const productsTable = require('./models/products_schema')
const userTable = require('./models/users_schema')
const user_router = require('./routes/user_route')

const db = new sqlite.Database('database.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

product_router.productsRoutes(app)
user_router.userRoutes(app)
productsTable.products_table(db)
userTable.users_table(db)
app.listen(port)