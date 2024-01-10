const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const { Pool } = require("pg");
const app = express();
const data = fs.readFileSync("users_db.json");
const jsonData = JSON.parse(data);
var i = 1;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoda-form
app.use(express.urlencoded({ extended: true }));

// DB connection setting
const db = new Pool({
  host: "bdaqmf6xngg39uikgco2-postgresql.services.clever-cloud.com",
  user: "usejhihitedy4m8fjy5b",
  password: "qf8t4xMEs9aaZkPbAZqawldFV4VYnW",
  database: "bdaqmf6xngg39uikgco2",
  port: 50013
});
// DB connection
db.connect(err => {
  if (err) throw err;
  console.log("Connection established");
});

// This funciton check if the user is already logged in the system
var f = 0;
function userCheckLog(userMail, userPasswd) {
  // Starts the inserting process. Before inserting the user in the DB occurs a check about if the user already exists
  try {
    while (jsonData.users != null) {
      if (
        userMail == jsonData.users[f].email &&
        userPasswd == jsonData.users[f].password
      ) {
        return true;
      }
      f++;
    }
  } catch (err) {
    f = 0;
    return false;
  }
}
// During the new user registration this function control if the emain used to create this new account is been used also to create another account
var v = 0;
function newUserCheck(userMail) {
  // Starts the inserting process. Before inserting the user in the DB occurs a check about if the user already exists
  try {
    while (jsonData.users != null) {
      if (userMail == jsonData.users[v].email) {
        return true;
      }
      v++;
    }
  } catch (err) {
    v = 0;
    return false;
  }
}
// This funciton is called to insert a new row in the "users" table into the DB
function writeUserData(
  userName,
  userSurname,
  userRegion,
  userMail,
  userPasswd
) {
  var currentDate = new Date();
  // Starts the inserting process. Before inserting the user in the DB occurs a check about if the user already exists

  if (newUserCheck(userMail)) {
    return false;
  }
  try {
    db.query(
      `INSERT INTO "users" ("id", "name", "surname", "email", "password", "region", "first_log_date")  
                     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [i, userName, userSurname, userMail, userPasswd, userRegion, currentDate]
    );

    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    i++;
  }
}
// This funciton is called to insert a new row in the "reservations" table into the DB

var b = 1;
function writeBookingData(
  name,
  surname,
  region,
  email,
  phone,
  additionalreq,
  apartment,
  checkin,
  checkout,
  people
) {
  try {
    db.query(
      `INSERT INTO "reservations" ("id", "name", "surname", "region", "email", "phone", "additionalreq", "apartment", "checkin", "checkout", "people")
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        b,
        name,
        surname,
        region,
        email,
        phone,
        additionalreq,
        apartment,
        checkin,
        checkout,
        people
      ]
    );

    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
}
// This function is called when a user is deleting a reservation
function removeBookingData(email, apartment) {
  console.log(email);
  query = `DELETE FROM reservations WHERE email=($1) AND apartment=($2)`;
  try {
    db.query(query, [email, apartment]);

    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
}

// This function is called when a user is searching for an apartment. For that reason it search, for the number of people, for the check-in date
// and the check-out date the available apartments
function checkApartmentAvailability(people, checkIn, checkOut) {
  var apAvailable = [];
  var apNotAvailable = [];
  var porch = false;
  var stable = false;
  var littlePorch = false;
  let date2 = new Date(checkIn).getTime();
  let date1 = new Date(checkOut).getTime();
  /* Firstly check the availability of the apartment that sutisfied the request */
  if (people < 4) {
    var iterator = jsonData.reservations.length - 1;

    while (iterator != -1) {
      let co = new Date(jsonData.reservations[iterator].checkout).getTime();
      let ci = new Date(jsonData.reservations[iterator].checkin).getTime();

      var control = false;
      if (co <= date2 || date1 <= ci) {
        for (var i = 0; i < apAvailable.length; i++) {
          if (apAvailable[i] == jsonData.reservations[iterator].apartment) {
            control = true;
            break;
          }
        }
        if (!control && (date1 != ci && co != date2)) {
          apAvailable.push(jsonData.reservations[iterator].apartment);
        }
      } else {
        apNotAvailable.push(jsonData.reservations[iterator].apartment);
      }
      iterator--;
    }
    if (
      apAvailable.length == 0 &&
      iterator == jsonData.reservations.length - 1
    ) {
      apAvailable.push("Portico", "Stalla", "Portichetto");
      return apAvailable;
    }
    for (var i = 0; i < jsonData.reservations.length; i++) {
      if (jsonData.reservations[i].apartment == "Portico") {
        porch = true;
      } else if (jsonData.reservations[i].apartment == "Stalla") {
        stable = true;
      } else if (jsonData.reservations[i].apartment == "Portichetto") {
        littlePorch = true;
      }
    }
    if (!porch) {
      apAvailable.push("Portico");
    }
    if (!stable) {
      apAvailable.push("Stalla");
    }
    if (!littlePorch) {
      apAvailable.push("Portichetto");
    }

    return apAvailable.filter(x => !apNotAvailable.includes(x));
  } else if (people >= 4 && people < 7) {
    console.log("Entra qua 1");
    var iterator = jsonData.reservations.length - 1;

    while (iterator != -1) {
      let co = new Date(jsonData.reservations[iterator].checkout).getTime();
      let ci = new Date(jsonData.reservations[iterator].checkin).getTime();

      if (jsonData.reservations[iterator].apartment != "Portico") {
        if (co <= date2 || date1 <= ci) {
          var control = false;
          for (var i = 0; i < apAvailable.length; i++) {
            if (apAvailable[i] == jsonData.reservations[iterator].apartment) {
              control = true;
              break;
            }
          }
          if (!control) {
            apAvailable.push(jsonData.reservations[iterator].apartment);
          }
        } else {
          apNotAvailable.push(jsonData.reservations[iterator].apartment);
        }
      }
      iterator--;
    }

    if (
      apAvailable.length == 0 &&
      iterator == jsonData.reservations.length - 1
    ) {
      apAvailable.push("Stalla", "Portichetto");
      return apAvailable;
    }

    for (var i = 0; i < jsonData.reservations.length; i++) {
      if (jsonData.reservations[i].apartment == "Stalla") {
        stable = true;
      } else if (jsonData.reservations[i].apartment == "Portichetto") {
        littlePorch = true;
      }
    }

    if (!stable) {
      apAvailable.push("Stalla");
    }
    if (!littlePorch) {
      apAvailable.push("Portichetto");
    }

    return apAvailable.filter(x => !apNotAvailable.includes(x));
  } else if (people > 6) {
    var iterator = jsonData.reservations.length - 1;

    while (iterator != -1) {
      let co = new Date(jsonData.reservations[iterator].checkout).getTime();
      let ci = new Date(jsonData.reservations[iterator].checkin).getTime();

      if (jsonData.reservations[iterator].apartment == "Portichetto") {
        if (co <= date2 || date1 <= ci) {
          apAvailable.push(jsonData.reservations[iterator].apartment);
          return apAvailable;
        }
      }
      iterator--;
    }
  }
  if (apAvailable.length == 0 && iterator == jsonData.reservations.length - 1) {
    apAvailable.push("Portichetto");
    return apAvailable;
  }
  for (var i = 0; i < jsonData.reservations.length; i++) {
    if (jsonData.reservations[i].apartment == "Portichetto") {
      littlePorch = true;
    }
  }
  if (!littlePorch) {
    apAvailable.push("Portichetto");
  }
  return apAvailable;
}
// this funciton return an array with only few reservation info
function checkReservation(email) {
  var iterator = jsonData.reservations.length - 1;
  var res = [];
  while (iterator != -1) {
    if (jsonData.reservations[iterator].email == email) {
      res.push([
        jsonData.reservations[iterator].apartment,
        new Date(jsonData.reservations[iterator].checkin).toLocaleDateString(
          "it"
        ),
        new Date(jsonData.reservations[iterator].checkout).toLocaleDateString(
          "it"
        ),
        jsonData.reservations[iterator].people
      ]);
    }
    iterator--;
  }
  if (res.length == 0) {
    return false;
  } else {
    return res;
  }
}
// This function is called in the admin ui to show him only the incoming reservation, not the past reservations
function reservations() {
  var res = [];
  var today = new Date();
  for (var i = 0; i < jsonData.reservations.length; i++) {
    var checkout = new Date(jsonData.reservations[i].checkout).getTime();
    if (checkout >= today.getTime()) {
      res.push(jsonData.reservations[i]);
    }
  }
  return res;
}
// This function is called in the admin ui to show him all the users
function users() {
  var res = [];
  for (var i = 1; i < jsonData.users.length; i++) {
    res.push(jsonData.users[i]);
  }
  return res;
}




var index = 1;
// Post request to insert a new user into the database
app.post("/newuser", urlencodedParser, function(req, res) {
  const userName = req.body["name"].split(" ");
  const name = userName[0];
  const surname = userName[1];
  const region = req.body["region"];
  const userEmail = req.body["email"];
  const userPassword = req.body["password"];
  const writeResult = writeUserData(
    name,
    surname,
    region,
    userEmail,
    userPassword
  );

  console.log(writeResult);

  if (writeResult) {
    // send the res from writeUserData funtion to the angular side POST request
    res.send(writeResult);
    // push the data into the JSON object file used to manage the data avoiding to questioning the DB 
    jsonData.users.push({
      id: index,
      name: name,
      surname: surname,
      email: userEmail,
      password: userPassword,
      region: region
    });

    fs.writeFileSync("users_db.json", JSON.stringify(jsonData));
    index++;
  }

  res.end();
  /* TO DO: Use the response for the client */
});

// Post request to login and enter in the ui section
app.post("/user", urlencodedParser, function(req, res) {
  const userEmail = req.body["email"];
  const userPassword = req.body["password"];

  res.send(userCheckLog(userEmail, userPassword));
  // close the connection
  res.end();
});
// This function id used to check the availability of the apartments for certain information
app.post("/availability", urlencodedParser, function(req, res) {
  const people = req.body[0];
  const handicap = req.body[1];
  const checkin = req.body[2];
  const checkout = req.body[3];
  var checkInDate = new Date(checkin);
  var checkOutDate = new Date(checkout);

  res.send(checkApartmentAvailability(people, checkInDate, checkOutDate));

  res.end();
});
// Effective booking request, passing data through this function to the function that send it to the DB and always write it also into the JSON object file
app.post("/booking", urlencodedParser, function(req, res) {
  const userName = req.body[0]["name"].split(" ");
  const name = userName[0];
  const surname = userName[1];
  const region = req.body[0]["region"];
  const email = req.body[0]["email"];
  const phone = req.body[0]["phone"];
  const additionalRequests = req.body[0]["additionalRequests"];
  const apartment = req.body[1];
  const checkin = req.body[2];
  const checkout = req.body[3];
  const people = req.body[4];

  result = writeBookingData(
    name,
    surname,
    region,
    email,
    phone,
    additionalRequests,
    apartment,
    checkin,
    checkout,
    people
  );
  if (result) {
    res.send(result);

    jsonData.reservations.push({
      id: b,
      name: name,
      surname: surname,
      email: email,
      region: region,
      phone: phone,
      additionalRequests: additionalRequests,
      apartment: apartment,
      checkin: checkin,
      checkout: checkout,
      people: people
    });
    fs.writeFileSync("users_db.json", JSON.stringify(jsonData));
    b++;
  }

  res.end();
});
// Used to check the reservation created with the req email
app.post("/email", urlencodedParser, function(req, res) {
  const email = req.body[0];
  const result = checkReservation(email);
  res.send(result);
  res.end();
});
// Used to pass to the Angular side the reservation that will be in the admin ui
app.get("/allreservations", urlencodedParser, function(req, res) {
  const result = reservations();
  console.log(result);
  res.send(result);
  res.end();
});
// Used to pass to the Angular side the users that will be in the admin ui
app.get("/allusers", urlencodedParser, function(req, res) {
  const result = users();
  console.log(result);
  res.send(result);
  res.end();
});
// This function is called when a user want to delete reservations
app.post("/updateR", urlencodedParser, function(req, res) {
  var temp = jsonData.reservations.length;
  const email = req.body[0];
  const apartment = req.body[1];
  console.log(email, apartment);
  const result = removeBookingData(email, apartment);

  for (let i = 0; i < temp; i++) {
    console.log("Entra qua");
    if (
      jsonData.reservations[i].email == email &&
      jsonData.reservations[i].apartment == apartment
    ) {
      console.log("Entra qua");
      jsonData.reservations.splice(i, 1);
      break;
    }
  }
  fs.writeFileSync("users_db.json", JSON.stringify(jsonData));

  res.send(result);
  res.end();
});
// This function put the server in listen mode
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
