const express = require("express");

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
    const user = req.body;
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
    let foundUser = null;
    users.forEach((aUser) => {
        if(aUser.email === bodyEmail)
        {
            foundUser = aUser;
        }
    });

    if(foundUser){
        return res.status(400).json({message: "User exists with that email"});
    }
    
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


//To login existing user
//Body: email and password
//Reponse: Logged in user
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
    const property = req.body;
    const bodyName = property.name;
    const bodyLocation = property.location;
    const bodyImageUrl = property.imageUrl;
    const bodyPrice = property.price;


    var errors = [];
    if (!bodyName) {
        errors.push({message: "Invalid name."});
    }
    if(!bodyLocation){
        errors.push({message: "Invalid location."});
    }
    if(!bodyImageUrl){
        errors.push({message: "Invalid image URL."});
    }
    if(!bodyPrice){
        errors.push({message: "Invalid price."});
    }

    if (errors.length >0) {
        return res.status(400).json({errorMessages: errors});
    }
    let foundProperty = null;
    properties.forEach((aProperty) => {
        if(aProperty.name === bodyName &&
            aProperty.location === bodyLocation &&
            aProperty.price === bodyPrice &&
            aProperty.imageUrl === bodyImageUrl)
        {
            foundProperty = aProperty;
        }
    });

    if(foundProperty){
        return res.status(400).json({message: "Property exists with this information."});
    }
    

    var newProperty = {
        id: (countProp + 1),
        name: bodyName,
        location: bodyLocation,
        imageUrl: bodyImageUrl,
        price: bodyPrice
    };
    countProp++;

    properties.push(newProperty);
    res.json(newProperty);
});


//Deleting a property by id
//Body: ID
app.delete("/properties/delete/:id", (req,res) => {
    const userID = req.params.id;


    if(!userID){
        return res.status(400).json({message: "Please pass in a userID"});
    }

    const numberUserId= parseInt(userID);
    console.log(numberUserId);
    if(isNaN(userID)){
        return res.status(400).json({message: "Expecting an integer."});
    }
    let len = properties.length;
    properties = properties.filter(property => !(property.id == userID));
    
    if (properties.length < len){
        return res.status(200).json({message: "User deleted."});
    }

    return res.status(404).json({message: "User not found."});

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
    const bookingRequest = req.body;
    const bodyDateFrom = bookingRequest.dateFrom;
    const bodyDateTo = bookingRequest.dateTo;
    const bodyUserID = bookingRequest.userId;

    var errors = [];
    if (!bodyDateFrom) {
        errors.push({message: "Invalid start date."});
    }
    if(!bodyDateTo){
        errors.push({message: "Invalid end date."});
    }
    if(!bodyUserID){
        errors.push({message: "Invalid user ID."});
    }
    if (errors.length >0) {
        return res.status(400).json({errorMessages: errors});
    }

    let foundBookReq = null;
    bookingRequests.forEach((aBookReq) => {
        if(aBookReq.dateFrom === bodyDateFrom &&
            aBookReq.location === bodyDateTo &&
            aBookReq.price === bodyUserID)
        {
            foundBookReq = aBookReq;
        }
    });

    if(foundBookReq){
        return res.status(400).json({message: "A booking request already exists with this information."});
    }

    var newBookingRequest = {
        id: (countBookRequest + 1),
        dateFrom: bodyDateFrom,
        dateTo: bodyDateTo,
        userId: bodyUserID,
        propertyID: parseInt(req.params.id),
        status: "NEW"
    };

    countBookRequest++;

    bookingRequests.push(newBookingRequest);
    res.json(newBookingRequest);
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

//////////Listening
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});