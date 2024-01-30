const express = require('express');

const app = express();
const router = express.Router();
const Post = require('../models/post');
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

  router.get("/about",(req,res)=>{
    res.render("about");
  });
  
  /**
   * Get /
   * Post: id
   */
  router.get("/post/:id", async (req,res)=>{
    try {
      const locals = {
        title: data.title,
        description: "Simple Blog Creation"
      }
      let slug = req.params.id;
      const data = await Post.findById({_id : slug});
      res.render('post', {locals, data, currentRoute: `/post/${slug}`});
    } catch(error){
      console.log(error);
    }
      
    });
//   function insertPostData (){
//     Post.insertMany([
//       {
//         title: "Building a Blog",
//       body: "This is the body text"
//     },
//     {
//       title: "Starting with git",
//     body: "This is the body text"
//   },
//   {
//     title: "HTML and CSS",
//   body: "This is the body text"
//  },
//  {
//    title: "Backened",
//  body: "This is the body text"
//  }
//      
//      ])
//    }
//insertPostData();
 module.exports = router;