const express = require("express");
const route = express.Router({ mergeParams: true });
const asyncwrap = require("../controllers/wrapasync");
const userSchema = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const Expresserror = require("../utils/expresserror");
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/verifytoken");
const cseModel = require("../models/cseSchema");
const eeeModel = require("../models/eeeSchema");
const mechaModel = require("../models/mechaSchema");
const civilModel = require("../models/civilSchema");
const secret_key = process.env.SECRET_KEY;
route.get("/", verifyToken, async (req, res) => {
  const getcse = await cseModel.find();
  var lap = 0,
    key = 0,
    logic = 0,
    multi = 0,
    costcse = 0,
    elementscse = 0;
  getcse.map((obj) => {
    costcse += obj.price;
    elementscse += obj.quantity;
    if (obj.item === "laptop") {
      lap += obj.quantity;
    } else if (obj.item === "keyboard") {
      key += obj.quantity;
    } else if (obj.item === "logic-gates") {
      logic += obj.quantity;
    } else {
      multi += obj.quantity;
    }
  });

  const geteee = await eeeModel.find();
  var osci = 0,
    resis = 0,
    transistor = 0,
    transformer = 0,
    costeee = 0,
    elementseee = 0;
  geteee.map((obj) => {
    costeee += obj.price;
    elementseee += obj.quantity;
    if (obj.item === "oscilloscope") {
      osci += obj.quantity;
    } else if (obj.item === "resistor") {
      resis += obj.quantity;
    } else if (obj.item === "transistor") {
      transistor += obj.quantity;
    } else {
      transformer += obj.quantity;
    }
  });

  const getme = await mechaModel.find();
  var lathe_machine = 0,
    heat_exchanger = 0,
    pressure_gauge = 0,
    pump = 0,
    costme = 0,
    elementsme = 0;
  getme.map((obj) => {
    costme += obj.price;
    elementsme += obj.quantity;
    if (obj.item === "lathe_machine") {
      lathe_machine += obj.quantity;
    } else if (obj.item === "heat_exchanger") {
      heat_exchanger += obj.quantity;
    } else if (obj.item === "pressure_gauge") {
      pressure_gauge += obj.quantity;
    } else {
      pump += obj.quantity;
    }
  });

  const getce = await civilModel.find();
  var Sieve = 0,
    Theodolite = 0,
    Inclinometer = 0,
    Piezometer = 0,
    costce = 0,
    elementsce = 0;
  getce.map((obj) => {
    costce += obj.price;
    elementsce += obj.quantity;
    if (obj.item === "Sieve") {
      Sieve += obj.quantity;
    } else if (obj.item === "Theodolite") {
      Theodolite += obj.quantity;
    } else if (obj.item === "Inclinometer") {
      Inclinometer += obj.quantity;
    } else {
      Piezometer += obj.quantity;
    }
  });
  const token = req.session.token;
  const dept = req.user.dept;
  res.render("home", {
    token,
    dept,
    Sieve,
    Theodolite,
    Inclinometer,
    lap,
    key,
    logic,
    multi,
    Piezometer,
    osci,
    resis,
    transistor,
    transformer,
    lathe_machine,
    heat_exchanger,
    pressure_gauge,
    pump,
    costcse,
    elementscse,
    costeee,
    elementseee,
    costme,
    elementsme,
    costce,
    elementsce,
  });
});
route.get("/signup", (req, res) => {
  res.render("signup");
});
route.get("/login", (req, res) => {
  res.render("login");
});
route.post(
  "/signup",
  asyncwrap(async (req, res) => {
    let { username, email, dept, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      username: username,
      email: email,
      dept: dept,
      password: hashedpassword,
    });
    await newUser.save();
    res.redirect("/login");
  })
);
route.post(
  "/login",
  asyncwrap(async (req, res, next) => {
    const { username, dept, password } = req.body;
    const user = await userSchema.findOne({ username });
    if (!user) {
      next(new Expresserror("500", "Wrong credentials"));
    } else {
      if (dept != user.dept) {
        next(new Expresserror("500", "Wrong credentials"));
      }
      const comparing = await bcrypt.compare(password, user.password);
      if (!comparing) {
        next(new Expresserror("500", "Wrong credentials"));
      } else {
        const token = jwt.sign({ username, dept }, secret_key, {
          expiresIn: "1h",
        });
        req.session.token = token;
        jwt.verify(token, secret_key, (err, decoded) => {
          if (err) {
            next(new Expresserror("500", "Verification Failed"));
          }
          req.user = decoded;
          req.flash("success", `${req.user.username} you are logged in`);
        });

        res.redirect(req.session.redirectTo || "/");
      }
    }
  })
);
route.get("/logout", verifyToken, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
module.exports = route;
