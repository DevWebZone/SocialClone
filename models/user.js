const mongoose = require('mongoose');
const multer =  require('multer');
const path = require('path');
const avatarPath = path.join('/uploads/users/avatar');

const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    avatar : {
        type: String
    },
    friends : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    timestamps: true
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('test');
      cb(null, path.join(__dirname, '..', avatarPath));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

UserSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');
UserSchema.statics.avatarPath = avatarPath;
const User = mongoose.model('User', UserSchema);
module.exports = User;