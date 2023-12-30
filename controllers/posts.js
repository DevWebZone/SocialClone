const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const Likes = require('../models/Likes')

module.exports.create = async function(req, res)
{
    let post = await Post.create({
                content: req.body.content,
                user: req.user._id
            });
    if(req.xhr)
    {
        return res.status(200).json({
            data: {
                post:post
            },
            message: 'post Created'
        }
        )
    }
    console.log(post);
    res.redirect('back');
    
}
module.exports.delete = async function(req, res)
{
    let post = await Post.findByIdAndDelete(req.query.id).populate("comments");
    for(comment of post.comments){
        Comment.findByIdAndDelete(comment._id);
    }
    console.log(req.xhr);
    if(req.xhr)
    {
        return res.status(200).json({
            data: {
                    post_id: req.query.id
                  },
            message: 'Post Deleted'
        });
    }    
    res.redirect('back');
    
}
module.exports.addComment = async function(req, res)
{
    let post = await Post.findById(req.body.post)
    let comment = await Comment.create({
                            content: req.body.content,
                            user: req.user._id,
                            post: req.body.post
                        });
    post.comments.push(comment);
    post.save();
    if(req.xhr)
    {
        return res.status(200).json({
            data: {
                comment:comment
            },
            message: 'Comment Added'
        }
        );
    }
    res.redirect('back');
    
}
module.exports.deleteComment = async function(req, res)
{
    let comment = await Comment.findByIdAndDelete(req.query.id)
    if(req.xhr)
    {
        return res.status(200).json({
            data: {
                    comment_id: req.query.id
                  },
            message: 'Comment Deleted'
        });
    }    
    res.redirect('back');
    
}
module.exports.addFriend = async function(req, res)
{
    console.log(req.body);
    let friend = await User.findOne({email: req.body.email});
    if(friend != null && friend._id != req.body.id)
    {    
        let user = await User.findById(req.body.id);
        console.log(friend);
        user.friends.push(friend);
        user.save();    
        res.redirect('back');     
    }
    else
    {
        console.log("Can't add user");
            res.redirect('back');
    }
        
}

module.exports.ToggleLike = async function(req, res)
{
    try{
        let deleted = false;
        let Likeable;
        console.log(req.query);
        if(req.query.type == "Post")
        {
            Likeable = await Post.findById(req.query.id).populate('likes');
        }
        else
        {
            Likeable = await Comment.findById(req.query.id).populate('likes');
        }
        let existingLike = await Likes.findOne({
            Likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        console.log(existingLike);
        if(existingLike)
        {
            Likeable.likes.pull(existingLike._id);
            Likeable.save();
            await Likes.findByIdAndDelete(existingLike._id);
            deleted = true
        }
        else
        {
            let newLike = await Likes.create({
                Likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            });
            Likeable.likes.push(newLike._id);
            Likeable.save();
        }
        return res.json(200,  {
            message: "Request Successful",
            data: {
                deleted:deleted
            }
        })
    
    }
    catch(err){
        return res.json(500,{
            message: "Request could not be completed due to :" + err
        })
    }
    


}