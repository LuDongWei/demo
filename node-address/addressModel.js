var mysql      = require('mysql');

var Model = function() {
    var self = this;

    self.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'address',
        port: 3306,
        transactionLimit: 50
    });
    
    self.connection.connect(); 
} 

// 检测是否建立连接
// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) { throw err };

//   console.log('The solution is: ', rows[0].solution);
// });


var selectSQL = 'select * from address limit 10';

var insertSQL = 'insert into t_address(name) values("conan"),("fens.me")';
var deleteSQL = 'delete from t_address';
var updateSQL = 'update t_address set name="conan update"  where name="conan"';



//查询
Model.prototype.getAddress = function(callback) {
    var self = this;
    
    self.connection.query(selectSQL, function(err0, res0 ) {
        if (err0) {
            console.log(err0);
        }
        
        callback(res0)
    })

}

//关闭连接
Model.prototype.closeAddress = function() {
    var self = this;

     self.connection.end();
}


module.exports = Model;
