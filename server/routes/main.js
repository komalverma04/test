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
//       title: "Bhartiya Janta Party",
//     body: "Lorem"
//   },
//   {
//     title: "Aam Aadmi Party",
//   body: "Lorem"
// },
// {
//   title: "Samajwadi Party",
// body: "Lorem"
//  }
//      
//    ])
//    }
//insertPostData();

//function insertEventData (){
//     Event.insertMany([
//       {
//         title: "Aam Aadmi Party",
//       body: "badhiya party hai",
//       link: "https://www.google.com/search?q=Aam+Aadmi+party&sca_esv=2e47e62a151241ca&bih=679&biw=1366&hl=en&tbm=nws&sxsrf=ADLYWII7XkWRdBQ7BhdeATaAujSKYFIVUw:1716026142398&story=GiMSIUFBUCBNUCBTd2F0aSBNYWxpd2FsIGFzc2F1bHQgY2FzZTIyCij1rqiq4vHb69UBhs7Km7f9konkAbKekr6WiKP7jwHK04vVw_O36tQBELLY0NALGAVyAhAB&fcs=ACgqzeda-5htx4fotKoM2mIX4vka4wmSyw&sa=X&ved=2ahUKEwj445HF95aGAxUlfGwGHRVdBIsQjcEJegQIGxAD"
//     },
//     {
//       title: "Bhartiya Janta Party",
//     body: "Donation should be done",
//      link: "https://www.bjp.org/home"
//     },
//     {
//      title: "Samajwadi Party",
//    body: "Kardo inhe bhi",
//    link: "https://www.samajwadiparty.in/"
//  }
//        ])
//      }
//  insertEventData();
 module.exports = router;