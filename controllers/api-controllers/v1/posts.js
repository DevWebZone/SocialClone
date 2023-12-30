const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){
    let posts = await Post.find({}).sort('-createdAt').populate('user').populate('comments');
        
    return res.json(200,{
        message: 'test api',
        posts: posts
    });
}