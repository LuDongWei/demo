var mysql      = require('mysql');
var data = null;

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


var selectSQL = 'select * from address';
var insertSQL = 'insert into address (name,phone) values ("$name$",$phone$)';
var deleteSQL = 'delete from address where id=$id$';
var updateSQL = 'update address set name="$name$",phone=$phone$ where id=$id$';

//查询
Model.prototype.getAddress = function(callback) {
    var self = this;
    
    self.connection.query(selectSQL, function(err0, res0) {

        if (err0) {
            console.log(err0);
            data = {
                return: false,
                message: err0
            }
        } else {
            data = res0;
        }
        callback(data)
    })

}

//增加
Model.prototype.addAddress = function(name,phone,callback) {
    var self = this;
        
    var newInsertSQL = insertSQL.replace('$name$',name).replace('$phone$',phone);  

    self.connection.query(newInsertSQL, function(err0, res0 ) {

        if (err0) {
            console.log(err0);
            data = {
                return: false,
                message: err0
            }
        }else{
            data = {
                return : true,
                message : null
            }
        }
        
        callback(data)
    })
}

//删除
Model.prototype.deleteAddress = function(id,callback) {
    var self = this;
    
    var newDeleteSQL = deleteSQL.replace('$id$',id);

    self.connection.query(newDeleteSQL, function(err0, res0 ) {

        if (err0) {
            console.log(err0);
            data = {
                return: false,
                message: err0
            }
        }else{
            data = {
                return : true,
                message : null
            }
        }
        
        callback(data)
    })

}

//更新
Model.prototype.updaAddress = function(name,phone,id,callback) {
    var self = this;

    var newUpdateSQL = updateSQL.replace('$name$',name).replace('$phone$',phone).replace('$id$',id);  
    
    self.connection.query(newUpdateSQL, function(err0, res0 ) {

        if (err0) {
            console.log(err0);
            data = {
                return: false,
                message: err0
            }
        }else{
            data = {
                return : true,
                message : null
            }
        }
        
        callback(data)
    })

}


//关闭连接
Model.prototype.closeAddress = function() {
    var self = this;

     self.connection.end();
}


module.exports = Model;
