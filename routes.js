const express = require("express");

const controllers = require("./controllers");

const router = express.Router();

router.get("/", controllers.getMail);
router.post("/send", controllers.postMail);

module.exports = router;