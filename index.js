const express = require("express");

//const constants = require("./constants");

const app = express();

app.use(expres.json());
app.use(express.urlencoded({extended: false}));

var users = new Array();

var properties = new Array();

///////////USERS:

//To create/register a new user
//Body: first name, last name, email, and password
//Response: Newly created user
app.post("/users", (req, res) => {
    const user = req.body;
    const bodyFirstname = user.firstname;
    const bodyLastname = user.lastname;
    const bodyEmail = user.email;
    const bodyPassword = user.password;

    var errors = [];
    if (!bodyEmail) {
        errors.push({message: "Invalid email."});
    }
    if(!bodyPassword){
        errors.push({message: "Invalid password."});
    }
    if(!bodyFirstname){
        errors.push({message: "Invalid first name."});
    }
    if(!bodyLastname){
        errors.push({message: "Invalid last name."});
    }

    if (errors.length >0) {
        return res.status(400).json({errorMessages: errors});
    }
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
    count++;

    var newUser = {
        id: (count + 1).toString(),
        firstname: bodyFirstname,
        lastname: bodyLastname,
        email: bodyEmail,
        password: bodyPassword
    };

    users.push(newUser);
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
        if(property.name === bodyName &&
            property.location === bodyLocation &&
            property.price === bodyPrice &&
            property.imageUrl === bodyImageUrl)
        {
            foundProperty = aProperty;
        }
    });

    if(foundProperty){
        return res.status(400).json({message: "Property exists with this information."});
    }
    count++;

    var newProperty = {
        id: (count + 1).toString(),
        name: bodyName,
        location: bodyLocation,
        imageUrl: bodyImageUrl,
        price: bodyPrice
    };

    users.push(newProperty);
    res.json(newProperty);
});