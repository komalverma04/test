const express = require('express');

const app = express();
const router = express.Router();
const Post = require('../models/post');
const Event = require('../models/event');
router.get("", async (req,res)=>{
  const locals = {
    title: "Node Js Blog",
    description: "Simple Blog Creation"
  }
  try {
    const data = await Post.find();
    res.render("index", {data});
  } catch(error){
    console.log(error);
  }
    
  });

  router.get("/about", async (req,res)=>{
    try {
      const data = await Event.find();
      res.render("about", {data});
    } catch(error){
      console.log(error);
    }
  });
  
  /**
   * Get /
   * Post: id
   */
  router.get("/post/:id", async (req,res)=>{
    try {
      let slug = req.params.id;
      const data = await Post.findById({_id : slug});

      const locals = {
        title: data.title,
        description: "Simple Blog Creation"
      }
      
      
      res.render('post', {locals, data, currentRoute: `/post/${slug}`});
    } catch(error){
      console.log(error);
    }
      
    });
    /**
   * post /
   * Post: search
   */
  router.post("/search", async (req,res)=>{
    try {
      const locals = {
        title: "Search",
        description: "Simple Blog Creation"
      }
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

      const data = await Post.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChar,'i')}},
          { body: { $regex: new RegExp(searchNoSpecialChar,'i')}}
        ]
      });
      res.render( 'search',{
        locals,
        data
      });
    } catch(error){
      console.log(error);
    }
      
    });
// function insertPostData (){
//   Post.insertMany([
//     {
//       title: "Building a Blog",
//     body: "This is the body text"
//   },
//   {
//     title: "Starting with git",
//   body: "This is the body text"
// },
// {
//   title: "HTML and CSS",
// body: "This is the body text"
//  },
//  {
//    title: "Backened",
//  body: "This is the body text"
//  }
//      
//      ])
//    }
//insertPostData();

//function insertEventData (){
//     Event.insertMany([
//       {
//         title: "Welcoming New Year",
//       body: "I have put my thoughts from 2023 and positive headstart to 2024",
//       link: "https://youtu.be/TUteg-auN7Y"
//     },
//     {
//       title: "Exploring Keolodo National Park",
//     body: "I with other like minded people from various colleges with WWF,India went to see the beauty of our biodiversity ",
//      link: "https://www.linkedin.com/posts/komal-verma-640897239_day-21-today-i-had-the-opportunity-to-visit-activity-7159516334630854656-Kxm6?utm_source=share&utm_medium=member_desktop"
//   }
//        ])
//      }
//  insertEventData();
 module.exports = router;