const CryptoJS = require('crypto-js')
const sqlite = require('sqlite3').verbose()
const generate = require('../middlewares/generateToken')

const db = new sqlite.Database("database.db")
exports.get_user = (req, res) => {
    db.all("SELECT * FROM users", [], (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error fetching users");
      } else {
        return res.json(data);
      }
    });
  };
  
exports.get_id=(req,res)=>{
    const id = req.params.id   
    db.all("SELECT * FROM users WHERE id=?",[id],(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json(data)
            }
        })
}
    
exports.create_user = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const hashed_password = CryptoJS.SHA256(password).toString();
    
    let sql = "INSERT INTO users (username,password,role) VALUES (?, ?, ?)"
    db.run(sql, [username,hashed_password,"user"], (err) => {
        if(err || username === "Admin"){
            res.json(JSON.stringify({status: "Error Reigstering"}))
        }
        res.json(JSON.stringify({status: "User Created"}))
    }) 
}



exports.login_user = (req, res) => {
    const {username, password}  = req.body;
    const hashed_password = CryptoJS.SHA256(password).toString();

    db.get('SELECT * FROM users WHERE username=?',[username],(err,row)=>{
       console.log("error")
        if(row && username === row.username && hashed_password === row.password){
        const token = generate.generateAccessToken(username, row.role);
        
            res.json({status:'Logged in', jwt: token, role: row.role});
       }else{
           res.json({status:'Wrong credentials'});
       }
    })
    }
      

    exports.update_user = (req, res) => {
      const update_id = req.params.id;
      const username = req.body.username;
      const password = CryptoJS.SHA256(req.body.password).toString(); // Hash the password using Crypto-js
      const role = req.body.role;
      console.log(update_id, username, password, role);
      db.run(
        'UPDATE users SET username=?, password=?, role=? WHERE id=?',
        [username, password, role, update_id],
        (err) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.json('User updated successfully!');
          }
        }
      );
    };
    
exports.delete_user=(req,res) =>{
    const users_id = req.params.id
    
        db.run("DELETE FROM users WHERE id=?",[users_id],(err)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json("Secsessfuly deleted")
            }
        })
    }