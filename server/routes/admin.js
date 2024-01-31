const express = require('express');
const app = express();
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';

/**
 * get /
 * home
 */
router.get('/admin',async (req,res) =>{
try {
    const locals = {
        title: "Admin",
        description: "Simple Blog "
    }
    res.render('admin/index',{locals, layout: adminLayout});
}catch(error){
    console.log(error);
}
});

/**
 * post /
 * admin - chack login
 */
router.post('/admin',async (req,res) =>{
    try {
        const { username, password } = req.body;
        

        res.redirect('/admin');
    }catch(error){
        console.log(error);
    }
    });

    /**
 * post /
 * admin - chack register
 */
router.post('/register',async (req,res) =>{
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const user = await User.create({username, password: hashedPassword});
            res.status(201).json({message: 'User Created', user});
        }catch(error){
            if(error.code === 11000){
                res.status(409).json({message: 'user already in use'});
            }
            res.status(500).json({message: 'Internal Server error'});
        }

       
    }catch(error){
        console.log(error);
    }
    });
    
    









module.exports = router;