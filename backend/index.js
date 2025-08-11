import express  from 'express';
import mongoose  from 'mongoose';
import cors  from 'cors';
import passport  from 'passport';
import oauthRoutes  from './GoogleOauth/oauthRoutes.js';
import { login, register, verifyToken , getUserProfile} from './Controllers/loginController.js';
import { updateProfile } from './Controllers/profile.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

mongoose.connect(process.env.MONGODB)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/auth', oauthRoutes);
app.post('/register', register);
app.post('/login', login);
app.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Profile access granted',
    user: req.user
  });
});
// To add rest data in DB 
app.post('/updateProfile', verifyToken,updateProfile);
// Get request to fetch user profile
app.get('/getUserProfile', verifyToken, getUserProfile);``


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
