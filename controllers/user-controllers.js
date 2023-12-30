const User =  require('../models/user');
const Post =  require('../models/post');

module.exports.signup = async function(req, res){
    try 
    {
        let user =  await User.findOne({email: req.body.email});

        if(!user){

            let newUser = await User.create({
                                email: req.body.email,
                                password: req.body.password,
                                name: req.body.name
                            });

            res.redirect('/');
        }
    } 
    catch (err) 
    {
        console.log(err);
    }
};

module.exports.signin = function(req, res)
{
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
};


module.exports.profile = async function(req, res){

    try
    {
        let result = await Post.find({user:req.user._id}).sort('-createdAt').populate('user').populate('comments');
        
        if(!req.isAuthenticated())
            return res.redirect('/sign-in');
        //
        return res.render("profile", {
                posts: result
            });
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        let user = await User.findById(req.params.id);
        
        await User.uploadAvatar(req, res, function(err){
            console.log(req.file);
            
            if(req.file){
                console.log("Path: " + User.avatarPath + '\\' + req.file.filename)
                user.avatar = User.avatarPath + '\\' + req.file.filename;
               //console.log(user);
               user.save();
            }
        })
        console.log(user);
        
        return res.redirect('back');
    }


}