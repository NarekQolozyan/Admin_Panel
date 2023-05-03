const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database("database.db", (err) => {
    if(err){
        console.log(err)
    }
    
})


exports.get_all = (req, res) => {
    db.all('SELECT * FROM products', [], (err, data) => {
        res.send(data)
    })
}

exports.get_byId = (req, res) => {
    const id = req.params.id
    db.get('SELECT * FROM products WHERE id=?', [id], (err, data) => {
        res.send(data)
    })
}

exports.add_product = (req,res) => {
    const name = req.body.name
    const price = req.body.price
    const img = req.body.img
    const description = req.body.description

    db.run('INSERT INTO products (name,price,img,description) VALUES (?,?,?,?)', [name,price,img,description],(err) => {
        res.json("OK")
    })
}

exports.edit_product = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const img = req.body.img;
    const description = req.body.description;
  
    db.run(
      "UPDATE products SET name=?, price=?, img=?, description=? WHERE id=?",
      [name, price, img, description, id],
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
        } else {
          res.json({ message: "Product updated successfully" });
        }
      }
    );
  };
  

exports.delete_product = (req,res) => {
    
    const watchs_id = req.params.id

    db.run('DELETE FROM products WHERE id=?', [watchs_id],(err) => {
        res.send("Sucsessfuly deleted")
    })
}
