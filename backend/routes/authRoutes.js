import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getStates, 
    getCitiesByState 
} from '../controllers/authController.js';

let router = express.Router();

// 1. Authentication Endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);

// 2. Dynamic Location Lookup Endpoints (Must be exactly spelled like this)
router.get('/states', getStates);
router.get('/cities/:stateId', getCitiesByState);

export default router;
