const express = require("express");
const List = require("../models/List");
const Movie = require("../models/Movie");
const { checkIfLoggedIn, ObjectIdIsValid } = require("../middlewares");
const router = express.Router();

router.post("/create", checkIfLoggedIn, async (req, res, next) => {
    /*
          * Create a new list
          * Require name and username id to create a list
          * Return the list created  
    */
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

router.get("/all", checkIfLoggedIn, async (req, res, next) => {
    /*
          * Get all lists
          * Requires to be logged in
          * Return all lists of the users  
    */
    try {
        const lists = await List.find({}).populate("user").select("-hashedPassword");;
        if(lists) {
            res.status(200).json({  message: "Lists retrieved successfully", lists });
        }else{
            res.status(500).json({ message: "Error retrieving Lists "});
        }
    } catch (error) {
        console.log(error);
    }


});

router.get("/:userId/all", checkIfLoggedIn, async (req, res, next) => {
    /*
          * Get all lists of a user
          * Requires username id to get all lists of a user
          * Return all lists of the user 
    */
    const { userId } = req.params;
    const username = req.session.currentUser;
    try { 
        if(ObjectIdIsValid(userId)) {
            const lists = await List.find({ user: username._id }).populate("user").select("-hashedPassword");;
            if(lists) {
                res.status(200).json({  message: "Lists retrieved successfully", lists });
            }else{
                res.status(500).json({ message: "Error retrieving Lists "});
            }
        }else{
            res.status(500).json({ message: "Invalid user ID"});
        }

    } catch (error) {
        console.log(error);
    }

});

router.get("/:listId/detail", checkIfLoggedIn, async (req, res, next) => {
    /*
          * Get list in detail
          * Requires list id to get all lists of a user
          * Return a single list
    */
    const { listId } = req.params;
    const username = req.session.currentUser;
    try { 
        if(ObjectIdIsValid(listId)) {
            const lists = await List.findOne({ _id: listId }).populate("user").select("-hashedPassword");
            if(lists) {
                res.status(200).json({  message: "Lists retrieved successfully", lists });
            }else{
                res.status(500).json({ message: "Error retrieving Lists "});
            }
        }else{
            res.status(500).json({ message: "Invalid list ID"});
        }

    } catch (error) {
        console.log(error);
    }

});



module.exports = router;