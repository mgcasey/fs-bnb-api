const express = require("express");
const User = require("./src/user/user");
const Provider = require("./src/provider/provider");
const Booking = require("./src/booking/booking");
const Property = require("./src/property/property");

//const constants = require("./constants");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

var users = new Array();
var properties = new Array();
var bookingRequests = new Array();
let countUser = 0;
let countProp = 0;
let countBookRequest = 0;

//////////////////////////////////////   USERS:

//To create/register a new user
//Body: first name, last name, email, and password
//Response: Newly created user
app.post("/users", (req, res) => {
    const newUser = req.body;
    // const bodyFirstname = user.firstname;
    // const bodyLastname = user.lastname;
    // const bodyEmail = user.email;
    // const bodyPassword = user.password;

    // var errors = [];
    
    // if (!bodyEmail) {
    //     errors.push({message: "Invalid email."});
    // }
    // if(!bodyPassword){
    //     errors.push({message: "Invalid password."});
    // }
    // if(!bodyFirstname){
    //     errors.push({message: "Invalid first name."});
    // }
    // if(!bodyLastname){
    //     errors.push({message: "Invalid last name."});
    // }

    // if (errors.length >0) {
    //     return res.status(400).json({errorMessages: errors});
    // }
    // let foundUser = null;
    // users.forEach((aUser) => {
    //     if(aUser.email === bodyEmail)
    //     {
    //         foundUser = aUser;
    //     }
    // });

    // if(foundUser){
    //     return res.status(400).json({message: "User exists with that email"});
    // }
    
    User.createUser(newUser, (err, result) => {
        console.log(err);
        console.log(result);
    });
    // var newUser = {
    //     firstname: bodyFirstname,
    //     lastname: bodyLastname,
    //     email: bodyEmail,
    //     password: bodyPassword
    // };
    // countUser++;

    // users.push(newUser);
    res.json(newUser);
});

app.get("/users/get/all", (req, res) => {
    User.getAllUsers((err, result) => {
        console.log(err);
        console.log(result);
    });
    //Error?
    res.json({message: "done"});
});

app.get("/users/get/:id", (req, res) => {
    const userId = req.params.id;
    User.getUserById(userId, (err, result) => {
        console.log(err);
        console.log(result);
    });
    //Error?
    res.json({message: "done"});
});

app.patch("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = req.body;
    const bodyName = user.name;
    const bodyEmail = user.email;
    const bodyPassword = user.password;
    const bodyRole = user.role;

    User.updateUserById(userId, bodyName, bodyEmail, bodyPassword, bodyRole, (err, result) =>
    {
        console.log(err);
        console.log(result);
    });
    if(err){
        return res.status(400).json(err);
    }
    res.json({message: "User updated."});
});

app.delete("/users/:id", (req,res) => {
    const userID = req.params.id;

    User.removeUser(userID, (err, result)=> {
        console.log(err);
        console.log(result);
    });
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
    res.json(userID);
});


//To login existing user
//Body: email and password
//Reponse: Logged in user

//---------------------------------WHAT????-------------------------//

app.post("/users/authentication", (req, res) => {
    const user = req.body;
    const bodyEmail = user.email;
    const bodyPassword = user.password;

    var errors = [];
    if (!bodyEmail) {
        errors.push({message: "Invalid email."});
    }
    if(!bodyPassword){
        errors.push({message: "Invalid password."});
    }
    if (errors.length >0) {
        return res.status(400).json({errorMessages: errors});
    }

    let foundUser = null;
    users.forEach((aUser) => {
        if(aUser.email === bodyEmail &&
            aUser.password === bodyPassword)
        {
            foundUser = aUser;
        }
    });

    if(!foundUser){
        return res.status(400).json({message: "User not found. Password or email may be incorrect."});
    }

    res.json(foundUser);
});



//////////////Properties


//To create a new property
//Body: name, location, imageUrl, price
//Response: id, name, location,imageUrl, price


app.post("/properties", (req, res) => {
    const newProperty = req.body;
    // const bodyName = property.name;
    // const bodyLocation = property.location;
    // const bodyImageUrl = property.imageUrl;
    // const bodyPrice = property.price;


    // var errors = [];
    // if (!bodyName) {
    //     errors.push({message: "Invalid name."});
    // }
    // if(!bodyLocation){
    //     errors.push({message: "Invalid location."});
    // }
    // if(!bodyImageUrl){
    //     errors.push({message: "Invalid image URL."});
    // }
    // if(!bodyPrice){
    //     errors.push({message: "Invalid price."});
    // }

    // if (errors.length >0) {
    //     return res.status(400).json({errorMessages: errors});
    // }
    // let foundProperty = null;
    // properties.forEach((aProperty) => {
    //     if(aProperty.name === bodyName &&
    //         aProperty.location === bodyLocation &&
    //         aProperty.price === bodyPrice &&
    //         aProperty.imageUrl === bodyImageUrl)
    //     {
    //         foundProperty = aProperty;
    //     }
    // });

    // if(foundProperty){
    //     return res.status(400).json({message: "Property exists with this information."});
    // }
    

    // var newProperty = {
    //     id: (countProp + 1),
    //     name: bodyName,
    //     location: bodyLocation,
    //     imageUrl: bodyImageUrl,
    //     price: bodyPrice
    // };
    // countProp++;

    // properties.push(newProperty);
    Property.createProperty(newProperty, (err, result) => {
        console.log(err);
        console.log(result);
    });
    res.json(newProperty);
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
    });
    //Error?
    res.json({message: "done"});
});


app.patch("/properties/:id", (req, res) => {
    const propertyId = req.params.id;
    const property = req.body;
    const bodyLocation = property.location;
    const bodyPrice = property.price;
    const bodyName = property.name;
    const bodyImageUrl = property.imageUrl;
    const bodyProviderId = property.providerId;

    Property.updatePropertyById(propertyId, bodyName, bodyPrice, bodyLocation, bodyProviderId, bodyImageUrl, (err, result) =>
    {
        console.log(err);
        console.log(result);
    });
    if(err){
        return res.status(400).json(err);
    }
    res.json({message: "Property updated."});
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
    // const bodyDateFrom = bookingRequest.dateFrom;
    // const bodyDateTo = bookingRequest.dateTo;
    // const bodyUserID = bookingRequest.userId;

    // var errors = [];
    // if (!bodyDateFrom) {
    //     errors.push({message: "Invalid start date."});
    // }
    // if(!bodyDateTo){
    //     errors.push({message: "Invalid end date."});
    // }
    // if(!bodyUserID){
    //     errors.push({message: "Invalid user ID."});
    // }
    // if (errors.length >0) {
    //     return res.status(400).json({errorMessages: errors});
    // }

    // let foundBookReq = null;
    // bookingRequests.forEach((aBookReq) => {
    //     if(aBookReq.dateFrom === bodyDateFrom &&
    //         aBookReq.location === bodyDateTo &&
    //         aBookReq.price === bodyUserID)
    //     {
    //         foundBookReq = aBookReq;
    //     }
    // });

    // if(foundBookReq){
    //     return res.status(400).json({message: "A booking request already exists with this information."});
    // }

    // var newBookingRequest = {
    //     id: (countBookRequest + 1),
    //     dateFrom: bodyDateFrom,
    //     dateTo: bodyDateTo,
    //     userId: bodyUserID,
    //     propertyID: parseInt(req.params.id),
    //     status: "NEW"
    // };

    // countBookRequest++;

    // bookingRequests.push(newBookingRequest);
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
    });
    //Error?
    res.json({message: "done"});
});

//------------------------------------------------NEEDS WORK------------------------------//
app.patch("/bookings/:id", (req, res) => {
    const bookingId = req.params.id;
    const booking = req.body;
    const bodyDateTo = booking.dateTo;
    const bodyDateFrom = booking.dateFrom;
    const bodyUserId = booking.userId;
    const bodyProviderId = booking.providerId;

    Property.updatePropertyById(bookingId, bodyDateTo, bodyDateFrom, bodyUserId, bodyProviderId, (err, result) =>
    {
        console.log(err);
        console.log(result);
    });
    if(err){
        return res.status(400).json(err);
    }
    res.json({message: "Booking updated."});
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
    const newProvider = req.body;
    Provider.createProvider(newProvider, (err, result) => {
        console.log(err);
        console.log(result);
    });
    res.json(newProvider);

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
    });
    //Error?
    res.json({message: "done"});
});

app.patch("/providers/:id", (req, res) => {
    const providerId = req.params.id;
    const provider = req.body;
    const bodyName= provider.name;
    const bodyEmail = provider.email;
    const bodyPassword= provider.password;
    const bodyRating = provider.rating;

    Property.updatePropertyById(providerId, bodyName, bodyEmail, bodyPassword, bodyRating, (err, result) =>
    {
        console.log(err);
        console.log(result);
    });
    if(err){
        return res.status(400).json(err);
    }
    res.json({message: "Provider updated."});
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