const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql')

const app = express();
const port = 2019;

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'Nur',
    password: '1234abcd',
    database: 'moviebertasbih',
    port: 3306
});

app.use(cors());
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.send('<center><h1> Ini HomePage !</h1></center/>')
})

app.get('/movielist', (req,res) => {
    var sql = `select * from movie`
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send(results);
    })

})

//========== Manage Movie ============

app.post('/addmovie', (req,res) => {
    var newMovie = {
        nama: req.body.nama,
        tahun: req.body.tahun,
        description: req.body.description
        }
    var sql = 'insert into movie set ?;'
    conn.query(sql, newMovie, (err, result) => {
        if (err) throw err;
        console.log(result); 
    })
    sql = `select * from movie`
    conn.query(sql, (err,result1) => {
        if(err) throw err;
        console.log(result1)
        res.send(result1);
    })
      
})
app.put('/editmovie/:id', (req, res) => {
    var editMovie = {
        nama: req.body.nama,
        tahun: req.body.tahun,
        description: req.body.description
        }
        var movieId = req.params.id;
        var sql = `Update movie set ? where id = ${movieId}`;
        conn.query(sql,editMovie, (err,result) => {
        if (err) throw err
        res.send(result)           
    })
        })

app.delete('/deletemovie/:id', (req,res)=> {
    var movieId = req.params.id;
        sql = `DELETE from movie where id = ${movieId};`
        conn.query(sql, (err,results) => {
        if(err) throw err
        res.send(results);
    })               
        }
)

//========== Manage Category ============

app.post('/addcategory', (req,res) => {
    var newCat = {
        nama: req.body.nama, 
        }
        var sql = 'insert into categories set ?;'
        conn.query(sql, newCat, (err, result) => {
            if (err) throw err;
            console.log(result); 
        })
        sql = `select * from categories`
        conn.query(sql, (err,result1) => {
            if(err) throw err;
            console.log(result1)
            res.send(result1);
        })
          
    })
app.put('/editcategory/:id', (req, res) => {
    var editCat = {
        nama: req.body.nama,
        }
        var catId = req.params.id;
        var sql = `Update categories set ? where id = ${catId}`;
        conn.query(sql,editCat, (err,result) => {
        if (err) throw err
        res.send(result)           
    })
        })

app.delete('/deletecategory/:id', (req,res)=> {
    var catId = req.params.id;
        sql = `DELETE from categories where id = ${catId};`
        conn.query(sql, (err,results) => {
        if(err) throw err
        res.send(results);
    })               
        }
)

//========== Connect Movies and Category ============

app.post('/addconnection', (req,res) => {
    var newConnection = {
        namaMovie: req.body.nama, 
        namaCategory: req.body.nama, 
        }
    var sql = 'insert into movecat set ?;'
    conn.query(sql, newConnection, (err, result) => {
        if (err) throw err;
        console.log(result); 
    })
    sql = `select m.nama as namaMovie, c.nama as namaCategory
    from movie m 
    join movcat mc
    on m.id = mc.idmovie
    join categories c
    on mc.idcategory = c.id`
    conn.query(sql, (err,result1) => {
        if(err) throw err;
        console.log(result1)
        res.send(result1);
    })
      
})

app.delete('/deleteconnection/:nama', (req,res)=> {
    var nama = req.params.nama;
        sql = `select m.nama as namaMovie, c.nama as namaCategory
        from movie m 
        join movcat mc
        on m.id = mc.idmovie
        join categories c
        on mc.idcategory = c.id`
        sql = `DELETE from movcat where nama = '${nama};`
        conn.query(sql, (err,results) => {
        if(err) throw err
        res.send(results);
    })               
        }
)
app.listen(port, () => console.log('API aktif di port ' + port));