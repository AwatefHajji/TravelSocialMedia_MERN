const { Register, Login, getAllUsers,getUserById,EditUser } = require('../controllers/userController');
const { v4: uuidv4 } = require('uuid');

const multer = require('multer');
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
const router = require('express').Router();
router.post('/register', Register);
router.post('/login', Login);
router.get("/getUserById/:id", getUserById);
router.get('/allusers/:id',getAllUsers)
router.put('/api/user/:id',upload.single('image'), EditUser);

module.exports = router;