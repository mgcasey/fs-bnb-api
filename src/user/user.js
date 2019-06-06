var mysqlConn = require("../../database");

var User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  };
  
  User.getAllUsers = function(result) {
    mysqlConn.query("Select * from user", function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Users : ", res);
        result(null, res);
      }
    });
  };

  User.getUserById = function(userId, result) {
    mysqlConn.query("Select * from user where id = ? ", userId, function(
      err,
      res
    ) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };

  User.getUserByEmail = function(userEmail, result) {
    mysqlConn.query("Select * from user where email = ? ", userEmail, function(
      err,
      res
    ) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };

  //don't need all of the params, just delete the user = ? to ?
  User.updateUserById = function(userId, user, result) {
    mysqlConn.query(
      "UPDATE user SET ? WHERE id = ?",
      [user, userId],
      function(err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  };

User.createUser = function(newUser, result) {
  mysqlConn.query("INSERT INTO user set ?", newUser, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });

  };

  User.removeUser = function(userId, result) {
    mysqlConn.query("DELETE FROM user WHERE id = ?", userId, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  };

  module.exports = User;

