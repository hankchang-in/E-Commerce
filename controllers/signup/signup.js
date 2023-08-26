const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../../models/users')




module.exports.getSignup = (req,res,next)=>{
    res.render('signup' , {
        message: req.flash('msg')
    });
}

module.exports.postSignup = async (req,res,next)=>{
    const {username , password} = req.body; 
    console.log(username , password)    
    try{
        let user  = await Users.findOne({username})
        if(user){
            req.flash('message' , 'User is already exist')
            res.redirect('/signup');
        }
        bcrypt.genSalt(saltRounds,async function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                // Store hash in your password DB.
               await Users.create({username , password : hash});
               req.flash('message' , 'Signed up Successfully');
                res.redirect('/login')
            });
        });
    }
    catch(err){
        next(err);
    }
}


