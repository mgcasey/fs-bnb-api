var mysqlConn = require("../../database");

var Provider = function(provider) {
    this.name = provider.name;
    this.email = provider.email;
    this.password = provider.password;
    this.rating = provider.rating;
  };
  
  Provider.getAllProviders= function(result) {
    mysqlConn.query("Select * from provider", function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Providers : ", res);
        result(null, res);
      }
    });
  };

  Provider.getProviderById = function(providerId, result) {
    mysqlConn.query("Select * from provider where id = ? ", providerId, function(
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

  Provider.updateProviderById = function(providerId, provider, result) {
    mysqlConn.query(
      "UPDATE provider SET ? WHERE id = ?",
      [provider, providerId],
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

Provider.createProvider = function(newProvider, result) {
    mysqlConn.query("INSERT INTO provider set ?", newProvider, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };

  Provider.removeProvider = function(providerId, result) {
    mysqlConn.query("DELETE FROM provider WHERE id = ?", providerId, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  };

  module.exports = Provider;

