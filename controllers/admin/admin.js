
module.exports.getAddProduct = (req,res,next)=>{

    res.render('addProducts');

}

module.exports.postAddProduct = (req,res,next)=>{
    // const image = req.file;
    console.log(req.file)
    res.send('getting respone')
}