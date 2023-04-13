const { User } = require('../models/userModel');
const bcrypt = require("bcrypt");
module.exports.Register= async (req,res) =>{
    // console.log(req.body);
    try {
        const logUser = await User.findOne({ email: req.body.email });
        // CHECK IF USER EXIST
        if (logUser) {
          res.status(400).json({ msg: 'Email already exist' });
        } else {
          User.create(req.body)
            .then((user) => {
              res.status(200).json({ user });
            })
            .catch((err) => res.status(400).json(err));
        }
      } catch (error) {res.status(400).json(error.errors);
        console.log(error);
      }
    
};
// LOGIN
module.exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: 'Email not found' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Wrong password' });
    }
    return res.json({ user});
  } 
  catch(error){res.status(400).json(error.errors);}
};
module.exports.getAllUsers = async (req, res) => {
try{
const users = await User.find({_id:{$ne:req.params.id} }).select([
  "email",
  "firstName",
  "lastName",
  "image",
  "_id"
]);
return res.json(users);
}
catch(error){res.status(400).json(error)}
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
  .then((user) => res.json(user))
  .catch((err) => res.status(400).json({ msg: 'user not found', err }))


};
module.exports.EditUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id)
  const url=req.protocol+'://'+req.get('host');
  const newUser = new User(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      image: req.file ? url + '/' + req.file.filename : null,
      imageCouv:req.file ? url + '/' + req.file.filename : null,
      bio : req.body.bio
      
    }
  );
  newUser.save()
  .then((user) => res.json(user))
  .catch((err) => res.status(400).json({ msg: 'error updating user', err }))

};
