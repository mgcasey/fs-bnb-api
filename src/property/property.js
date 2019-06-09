var mysqlConn = require("../../database");

var Property = function(property) {
    this.price = property.price;
    //this.description = property.description;
    this.location = property.location;
    this.name = property.name;
    this.picture = property.picture;
    this.providerId = property.providerId;
  };
  
  Property.getAllProperties = function(result) {
    mysqlConn.query("Select * from property", function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Properties : ", res);
        result(null, res);
      }
    });
  };

  Property.getPropertyById = function(propertyID, result) {
    mysqlConn.query("Select * from property where id = ? ", propertyID, function(
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

  Property.updatePropertyById = function(propertyID, property, result) {
    mysqlConn.query(
      "UPDATE property SET ? WHERE id = ?",
      [property, propertyID],
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

Property.createProperty = function(newProperty, result) {
    mysqlConn.query("INSERT INTO property set ?", newProperty, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };

  Property.removeProperty = function(propertyID, result) {
    mysqlConn.query("DELETE FROM property WHERE id = ?", propertyID, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  };

  module.exports = Property;

