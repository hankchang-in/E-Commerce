module.exports.getProfile = (req,res,next)=>{
    // console.log(req.user)
    res.render('profile',{
        name : req.user.username,
        admin : req.user.admin,
    });
}