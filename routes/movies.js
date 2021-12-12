const express = require("express");
const List = require("../models/List");
const Movie = require("../models/Movie");
const { checkIfLoggedIn } = require("../middlewares");
const router = express.Router();

router.post("/create", checkIfLoggedIn, async (req, res, next) => {
    /*
          * Create a new movie
          * Require title and director for a movie
          * Return the movie created  
    */
    const { title, director } = req.body;
    try {
        const movie = await Movie.create({
            title,
            director,
        });
        if(movie) {
            res.status(200).json({  message: "Movie created successfully", movie });
        }else{
            res.status(500).json({ message: "Error creating Movie "});
        }
    } catch (error) {
        console.log(error);
    }

});



module.exports = router;