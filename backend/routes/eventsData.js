const express = require("express");
const router = express.Router();
const orgID = process.env.ORG_ID; 

//importing data model schemas
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    eventdata.find(
        {organization: orgID}, 
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
router.get("/id/:id", (req, res, next) => { 
    eventdata.find({ _id: req.params.id, organization: orgID }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    eventdata.find( 
        dbQuery,
        {organization: orgID}, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id, organization: orgID }, 
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
    eventdata.create( 
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

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { _id: req.params.id },
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

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
            else {
                console.log('User attempted to add client to an already enrolled event');
            }    
            }
        }
    );
    
});

//DELETE a event by ID
router.delete('/id/:id', (req, res, next) => {
    //mongoose will use _id of document
    eventdata.findOneAndRemove({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    });
});

//get number of attendees for a specific event
router.get('/attending/:id', (req, res, next) => {
    eventdata.aggregate([
      { $match : { _id : req.params.id } },
      { $project : {attendees : {$size: "$attendees"}}},
    ], (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data);
        }
    });
});

//Creating route that gets the past two months data of attendees being assigned to an event
let today = new Date();
today.setMonth(today.getMonth() - 2);
let query = {date: {$gte:today}};

router.get("/twoMonthsEvents", (req, res, next) => { 
    eventdata.find(query,  
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                if (data.length >= 0) {
                    eventdata.aggregate([
                        {$group: { _id: "$eventName", totalSize: { $sum: { $size: "$attendees"} } } } 
                ], (error, data) => {
                    if (error) {
            
                      return next(error)
            
                    } else {
                        res.json(data);
            
                        }
            
                    })
                }
            }
            })
        });

module.exports = router;
