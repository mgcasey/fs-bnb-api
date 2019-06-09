const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const User = require("./src/user/user");
const Provider = require("./src/provider/provider");
const Booking = require("./src/booking/booking");
const Property = require("./src/property/property");

const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root3306",
    database: "fs_bnb"  //deleted role from table - watch out!
};
//create new connection to database
const connection = mysql.createConnection(config);
connection.connect();

const app = express();

app.use(cors());

//default http wants json sent, not "send" message
app.use(express.json());
app.use(express.urlencoded({extended: "false"}));





//const constants = require("./constants");


// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

var users = new Array();
var properties = new Array();
var bookingRequests = new Array();


//////////////////////////////////////   USERS:

//To create/register a new user
//Body: first name, last name, email, and password
//Response: Newly created user
// app.post("/users", (req, res) => {
//     const newUser = req.body;
     
//     User.createUser(newUser, (err, result) => {
//         console.log(err);
//         console.log(result);
//     });

//     res.status(200).json(newUser);
// });


//--------------------------------????????????????????????
app.post("/users", (req,res) => {
    const user = req.body;
    console.log(user);
    connection.query("INSERT INTO user SET ?", user, (err, result) => {
        if(err) {
            console.log(err);
            if (err.code == "ER_DUP_ENTRY") {
                //print out specific alert to user that already used email/password
                return res.status(400).json({message: err.sqlMessage});
            }
            else {
                return res.status(500).json({message: "Failed to insert. Please try again."});
            }
        }
        console.log(result);
        var responseUser = {
            id: result.insertId,
            name: user.name,
            email: user.email,
            password: user.password
        };

        return res.status(200).json(responseUser);
    });

});

app.get("/users/all", (req, res) => {
    User.getAllUsers((err, result) => {
        console.log(err);
        console.log(result);
    });
    //Error?
    res.json({message: "done"});
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    User.getUserById(userId, (err, result) => {
        console.log(err);
        console.log(result);
              // if (err) {
        console.log("error: ", err);
        if(err){
            return res.status(500).json({message: "Failed to select."});
        }
        if(result.length === 0) {
            return res.status(404).json({message: "No user found for that ID."});
        }
        //need to disguise password, only send what need to user interface
        const userResponse = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email
        }
        return res.status(200).json(userResponse);
      
    });
    //Error?
    //res.json({message: "done"});
});

//-----------------------------------------UPDATE USER----------------------------//
//............................need to fix the other updates.....................
app.patch("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = req.body;
    

    User.updateUserById(userId, user, (err, result) =>
    {
        console.log(err);
        console.log(result);
        if(err){
            return res.status(400).json(err);
        }
        return res.status(200).json({message: "User updated."});
    });
    
    
});

app.delete("/users/:id", (req,res) => {
    const userID = req.params.id;

    User.removeUser(userID, (err, result)=> {
        console.log(err);
        console.log(result);
    });

    res.status(200).json(userID);
});


//To login existing user
//Body: email and password
//Reponse: Logged in user

//may need param
app.post("/users/authentication", (req, res) => {
    const user = req.body;
    const bodyEmail = user.email;
    const bodyPassword = user.password;
 
    if(!bodyPassword) {
        return res.status(400).json({message: "Invalid password."});
    }
    if(!bodyEmail) {
        return res.status(400).json({message: "Invalid email."});
    }

    User.getUserByEmail(bodyEmail, (err, result) => {
        if(err) {
            return res.status(400).json({message: "No user."});
        }
        if(result[0].password !== bodyPassword){
            return res.status(400).json({message: "Email and password do not match."});
            
        }
        

        const userResponse = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email
        }
        return res.status(200).json(userResponse);

        
    }); 

    // User.getUserByEmail(bodyEmail, (err, result) => {
    //     if(err) {
    //         return res.status(500).json({message: "Failed to login."});
    //     }
    //     if(result.length === 0) {
    //         return res.status(401).json({message: "Invalid email or password."});
    //     }
    //     if(result[0].password === bodyPassword){
    //         const responseUser = {
    //              id: result[0].id,
    //             name: result[0].name,
    //             email: result[0].email
    //         };
    //         return res.status(200).json(responseUser);
    //     }
    //     return res.status(400).json({message: "Email and password do not match."});
        
        
    // }); 
});



//////////////Properties


//To create a new property
//Body: name, location, imageUrl, price
//Response: id, name, location,imageUrl, price


app.post("/properties", (req, res) => {
    const property = req.body;
 
    // Property.createProperty(newProperty, (err, result) => {
    //     console.log(err);
    //     console.log(result);
    // });

    connection.query("INSERT INTO property SET ?", property, (err, result) => {
        if(err) {
            console.log(err);
            if (err.code == "ER_DUP_ENTRY") {
                //print out specific alert to user that already used email/password
                return res.status(400).json({message: err.sqlMessage});
            }
            else {
                return res.status(500).json({message: "Failed to insert. Please try again."});
            }
        }
        console.log(result);
        var responseProperty = {
            id: result.insertId,
            location: property.location,
            imageUrl: property.picture,
            name: property.name,
            providerId: property.providerId,
            price: property.price
        };

        return res.status(200).json(responseProperty);
    });

    //res.json(newProperty);
});

app.get("/properties/get/all", (req, res) => {
    Property.getAllProperties((err, result) => {
        console.log(err);
        console.log(result);
    });
    //Error?
    res.json({message: "done"});
});

app.get("/properties/get/:id", (req, res) => {
    const propertyId = req.params.id;
    Property.getPropertyById(propertyId, (err, result) => {
        console.log(err);
        console.log(result);

        if(err){
            return res.status(500).json({message: "Failed to select."});
        }
        if(result.length === 0) {
            return res.status(404).json({message: "No property found for that ID."});
        }
        //need to disguise password, only send what need to user interface
        const propertyResponse = {
            id: result[0].id,
            name: result[0].name,
            location: result[0].location,
            price: result[0].price,
            imageUrl: result[0].imageUrl,
            providerId: result[0].providerId
        }
        return res.status(200).json(propertyResponse);

    });

});


app.patch("/properties/:id", (req, res) => {
    const propertyId = req.params.id;
    const property = req.body;

    Property.updatePropertyById(propertyId, property, (err, result) =>
    {
        console.log(err);
        console.log(result);
        if(err){
            return res.status(400).json(err);
        }
        return res.status(200).json({message: "Property updated."});
    });
    
});

//Deleting a property by id
//Body: ID
app.delete("/properties/delete/:id", (req,res) => {
    const propertyID = req.params.id;
    Property.removeProperty(propertyID, (err, result)=> {
        console.log(err);
        console.log(result);
    });
    res.json(propertyID);
    // if(!userID){
    //     return res.status(400).json({message: "Please pass in a userID"});
    // }

    // const numberUserId= parseInt(userID);
    // console.log(numberUserId);
    // if(isNaN(userID)){
    //     return res.status(400).json({message: "Expecting an integer."});
    // }
    // let len = properties.length;
    // properties = properties.filter(property => !(property.id == userID));
    
    // if (properties.length < len){
    //     return res.status(200).json({message: "User deleted."});
    // }

    // return res.status(404).json({message: "User not found."});

});

//Getting a property by id
app.get("/properties/:id", (req, res) => {
    const propertyID = req.params.id;

    if(!propertyID){
        return res.status(400).json({message: "Please pass in a userID"});
    }
    const numberPropID = parseInt(propertyID);
    if(isNaN(numberPropID)){
        return res.status(400).json({message: "Expecting an integer."});
    }
    

    
    console.log(properties.length);

    for(var k = 0; k <properties.length; k++) {
        // const aProperty = properties[k];
        //two equal signs because not the same type (one number, one string)
     
        if(properties[k].id == propertyID){ 
            return res.status(200).json(properties[k]);
        }
    }
    return res.status(404).json({message: "Property not found."});
});
    
//Booking Requests
//To create new booking request
app.post("/properties/:id/bookings", (req, res) => {
    const newBooking = req.body;
    
   
    Booking.createBooking(newBooking, (err, result) => {
        console.log(err);
        console.log(result);
    });
    res.json(newBookingRequest);
});

app.get("/bookings/get/all", (req, res) => {
    Booking.getAllBookings((err, result) => {
        console.log(err);
        console.log(result);
    });
    //Error?
    res.json({message: "done"});
});

app.get("/bookings/get/:id", (req, res) => {
    const bookingId = req.params.id;
    Booking.getBookingById(bookingId, (err, result) => {
        console.log(err);
        console.log(result);
        if(err){
            return res.status(500).json({message: "Failed to select."});
        }
        if(result.length === 0) {
            return res.status(404).json({message: "No booking found for that ID."});
        }
        //need to disguise password, only send what need to user interface
        const bookingResponse = {
            id: result[0].id,
            dateTo: result[0].dateTo,
            dateFrom: result[0].dateFrom,
            userId: result[0].userId,
            providerId: result[0].providerId
        }
        return res.status(200).json(bookingResponse);
    });
    
});

//------------------------------------------------NEEDS WORK------------------------------//
app.patch("/bookings/:id", (req, res) => {
    const bookingId = req.params.id;
    const booking = req.body;
    

    Property.updatePropertyById(bookingId, booking, (err, result) =>
    {
        console.log(err);
        console.log(result);
        if(err){
            return res.status(400).json(err);
        }
        return res.status(200).json({message: "Booking updated."});
    });
    
});

//Getting Booking Requests by ID
//
app.get("/properties/:id/bookings", (req, res) => {
    const propertyId = req.params.id;

    let propBookRequests = bookingRequests.filter(bookingRequest => (bookingRequest.propertyID == propertyId));

    if(!propBookRequests){
        return res.status(404).json({message: "No bookings found."});
    }
    else{
        res.json(propBookRequests);
    }

});

app.delete("/properties/:id/bookings", (req,res) => {
    const bookingID = req.params.id;
    Provider.removeProvider(bookingID, (err, result)=> {
        console.log(err);
        console.log(result);
    });
    res.json(bookingID);
    

});


///////////////////////////////////////Provider
app.post("/providers", (req, res) => {
    const provider = req.body;
    console.log(provider);
    connection.query("INSERT INTO provider SET ?", provider, (err, result) => {
        if(err) {
            console.log(err);
            if (err.code == "ER_DUP_ENTRY") {
                //print out specific alert to user that already used email/password
                return res.status(400).json({message: err.sqlMessage});
            }
            else {
                return res.status(500).json({message: "Failed to insert. Please try again."});
            }
        }
        console.log(result);
        var responseProvider = {
            id: result.insertId,
            name: provider.name,
            email: provider.email,
            password: provider.password,
            rating: provider.rating
        };

        return res.status(200).json(responseProvider);
    });

    // const newProvider = req.body;
    // Provider.createProvider(newProvider, (err, result) => {
    //     console.log(err);
    //     console.log(result);
    // });
    // res.json(newProvider);

});

app.post("/providers/authentication", (req, res) => {
    const provider = req.body;
    const bodyEmail = provider.email;
    const bodyPassword = provider.password;
 
    if(!bodyPassword) {
        return res.status(400).json({message: "Invalid password."});
    }
    if(!bodyEmail) {
        return res.status(400).json({message: "Invalid email."});
    }

    Provider.getProviderByEmail(bodyEmail, (err, result) => {
        if(err) {
            return res.status(400).json({message: "No provider."});
        }
        if(result[0].password !== bodyPassword){
            return res.status(400).json({message: "Email and password do not match."});
            
        }
        

        const providerResponse = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
            rating: result[0].rating
        }
        return res.status(200).json(providerResponse);

        
    }); 
});

app.get("/providers/get/all", (req, res) => {
    Provider.getAllProvider((err, result) => {
        console.log(err);
        console.log(result);
    });
    //Error?
    res.json({message: "done"});
});

app.get("/providers/get/:id", (req, res) => {
    const providerId = req.params.id;
    Provider.getProviderById(providerId, (err, result) => {
        console.log(err);
        console.log(result);
        if(err){
            return res.status(500).json({message: "Failed to select."});
        }
        if(result.length === 0) {
            return res.status(404).json({message: "No provider found for that ID."});
        }
        //need to disguise password, only send what need to user interface
        const providerResponse = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
            rating: result[0].rating
        }
        return res.status(200).json(providerResponse);
    });
  
});

app.patch("/providers/:id", (req, res) => {
    const providerId = req.params.id;
    const provider = req.body;
    
    Property.updatePropertyById(providerId, provider, (err, result) =>
    {
        console.log(err);
        console.log(result);
        if(err){
            return res.status(400).json(err);
        }
        return res.status(200).json({message: "Provider updated."});
    });
    
});

app.delete("/providers/:id", (req,res) => {
    const providerID = req.params.id;
    Provider.removeProvider(providerID, (err, result)=> {
        console.log(err);
        console.log(result);
    });
    res.json(providerID);
    

});

//////////Listening
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});