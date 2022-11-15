const express = require("express"); 
const router = express.Router();
const orgID = process.env.ORG_ID; 

//importing data model schemas
let { orgdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    orgdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/", (req, res, next) => {
    orgdata.find( 
        { _id: orgID }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => { 
    orgdata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
});

module.exports = router;
