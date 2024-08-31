var express = require("express");
var cors = require("cors");

var mongoClient = require("mongodb").MongoClient;

const app = express()
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// connection string
var conString = "mongodb://127.0.0.1:27017";


// API Routes


// ***************************************  Users collections Api Methods   **********************************

// http://localhost:3200/users
app.get("/users", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo-react");
        database.collection("tblusers").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});


app.get("/users:/userid", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo-react");
        database.collection("tblusers").find({ UserId: req.params.userid }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

// http://localhost:3200/register-user
app.post("/register-user", (req, res) => {
    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    };
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo-react");
        database.collection("tblusers").insertOne(user).then(() => {
            console.log("User Registered");
            res.end();
        });
    });
});

app.put("/edit-user/:userid", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo-react");
        database.collection("tblusers").updateOne({ UserId: req.params.userid }, { $set: { UserId: req.body.UserId, UserName: req.body.UserName, Password: req.body.Password, Email: req.body.Email, Mobile: req.body.Mobile } }).then(() => {
            console.log("User Details Updated");
            res.end();
        });
    });
});

app.delete("/delete-user/:userid", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo-react");
        database.collection("tblusers").deleteOne({ UserId: req.params.userid }).then(() => {
            console.log("User Deleted");
            res.end();
        })
    })
})



// ***************************************  Appointments collections Api Methods   **********************************

app.get("/appointments/:userid", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo-react");
        database.collection("tblappointments").find({ UserId: req.params.userid }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-appointment/:id", (req, res)=>{

    mongoClient.connect(conString).then(clientObj=>{
         var database = clientObj.db("todo-react");
         database.collection("tblappointments").find({Appointment_Id:parseInt(req.params.id)}).toArray().then(documents=>{
              res.send(documents);
              res.end();
         });
    });
});


app.post("/add-appointment", (req, res) => {
    var appointment = {
        Appointment_Id: parseInt(req.body.Appointment_Id),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId
    };
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo-react");
        database.collection("tblappointments").insertOne(appointment).then(() => {
            console.log("Appointment Added");
            res.end();
        });
    });
});


app.put("/edit-appointment/:id", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo-react");
        database.collection("tblappointments").updateOne({ Appointment_Id: parseInt(req.params.id) }, { $set: { Appointment_Id:parseInt(req.body.Appointment_Id), Title: req.body.Title, Description: req.body.Description, Date: new Date(req.body.Date), UserId: req.body.UserId } }).then(() => {
            console.log("Apponit Details Updated");
            res.end();
        });
    });
});

app.delete("/delete-appointment/:id", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo-react");
        database.collection("tblappointments").deleteOne({ Appointment_Id: parseInt(req.params.id) }).then(() => {
            console.log("Appointments Deleted");
            res.end();
        })
    })
})

app.listen(3200);
console.log(`Server Started : http://127.0.0.1:3200`);
