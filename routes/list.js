const express = require("express");
const List = require("../models/List");
const Movie = require("../models/Movie");
const { checkIfLoggedIn } = require("../middlewares");
const router = express.Router();

router.post("/create", checkIfLoggedIn, async (req, res, next) => {
    const { name } = req.body;
    const username = req.session.currentUser;
    try {
        const list = await List.create({
            name,
            user: username._id
        });
        if(list) {
            res.status(200).json({  message: "List created successfully", list });
        }else{
            res.status(500).json({ message: "Error creating List "});
        }
    } catch (error) {
        console.log(error);
    }

});



module.exports = router;