const express = require("express");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter the name of at least 3 characters").isLength({
      min: 3,
    }),

    body(
      "description",
      "Enter the description of at least 5 characters"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //chcek whether the user with this email exists

      const { title, description, tag } = req.body;
      const note = await Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savednote = await note.save();

      res.status(201).json(savednote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// router.put("/updatenote/:id", fetchuser, async (req, res) => {
//   const { title, description, tag } = req.body;
// try{



//   const newNote = {};
//   if (title) {
//     newNote.title = title;
//   }
//   if (description) {
//     newNote.description = description;
//   }
//   if (tag) {
//     newNote.tag = tag;
//   }

//   let note = await Note.findById(
//     req.params.id,
//     { $set: newNote},
//     { new: true }
//   );
//   res.json({ note });
//   if (!note) {
//     return res.status(404).send("not found");
//   }
//   if (note.user.toString() !== req.user.id) {
//     return res.status(401).send("Not allowed");
//   }
//   note = await Note.findByIdAndUpdate(req.params.id);
// }
// catch(error){
//     console.error(error);
//       res.status(500).json({ error: "Server error" });
// }
// });

router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
  
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
  
    try {
      let note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote }, // Use $set to update specific fields
        { new: true }
      );
  
      if (!note) {
        return res.status(404).send("Not found");
      }
  
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }
  
      res.json({ note });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
  

  router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
  
    try {
        let note = await Note.findById(req.params.id)
    
        if (!note) {
          return res.status(404).send("Not found");
        }
    
        if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.status(201).send({"Success":"Note has been deleted"});

    }
       catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    });

    
      
   
  

module.exports = router;
