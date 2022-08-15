//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

const items = ["Buy food", "Cook food", "Eat food"]

const workItems = []


app.get("/", (req, res) => {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

 
  const getToday = currentDate.toLocaleDateString("en-US", options)
    
  res.render("todo", {listHeader: getToday,  gotoPage: "/work", newItem: items });
});

app.post("/", (req, res)=>{
    const listType = req.body.addList;
    const task = req.body.todo;

    if(listType === "Work"){
        workItems.push(task);
        res.redirect("/work");

    }
    else{
        items.push(task)
        res.redirect("/");
    }
    
    

});

app.get("/work", (req, res)=>{


    res.render("todo", {listHeader: "Work List", gotoPage: "/", newItem: workItems})
})


// connect server
const port = 3000 || process.env;
app.listen(port, () => {
  console.log(`Connected on port ` + port);
});
