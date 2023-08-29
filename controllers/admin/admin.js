const cloudinary = require('cloudinary').v2

//configuring the cloudinary account 
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

module.exports.getAddProduct = (req,res,next)=>{

    res.render('addProducts' , {
        admin : req.user.admin
    });

}

module.exports.postAddProduct = (req,res,next)=>{
    // const image = req.file;
    console.log(req.file)
    cloudinary.uploader.upload(`uploads/${req.file.filename}`   , (error, result)=>{
    console.log(result, error);
    if(result){
        
        res.send('getting respone')
    }
    else{
        res.send("Can't post ")
    }
    });
}