const User = require("../../../models/user");
const jwt = require('jsonwebtoken');
const Post = require("../../../models/post");

module.exports.signin = async function(req, res)
{
    try{
        let user =  await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password)
            {
                return res.json(422,{
                    message: "Invalid Username/Password"
                });
            }
        return res.json(200, {
            message: "Logged in Successfully",
            data: {
                token: jwt.sign(user.toJSON(), 'secret', { expiresIn: "1000000"})
            }
        })
    }
    catch(err)
    {
        console.log(err);
        return res.json(500, {
            message: "Internal Server Error"
        })
    }
   
};

module.exports.profile = async function(req, res)
{
    try{
        let result = await Post.find({}).sort('-createdAt').populate('user').populate('comments');
        return res.status(200).json({ 
            message: "profile loaded",
            data: result
        });
    }
    catch(err)
    {
        return res.json(500, {
            message: "Internal Server Error"
        })
    }
   
};