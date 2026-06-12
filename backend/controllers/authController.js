import UserModel, { StateModel, CityModel } from '../models/userModel.js';

export const getStates = async (req, res) => {
    try {
        let states = await StateModel.findAll({ order: [['name', 'ASC']] });
        return res.status(200).json(states);
    } catch (error) {
        return res.status(500).json({ Res: "Error", message: error.message });
    }
};


export const getCitiesByState = async (req, res) => {
    try {
        let cities = await CityModel.findAll({
            where: { state_id: req.params.stateId },
            order: [['name', 'ASC']]
        });
        return res.status(200).json(cities);
    } catch (error) {
        return res.status(500).json({ Res: "Error", message: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        let username = req.body.username;
        let email = req.body.email;
        let number = req.body.number;
        let states = req.body.states;
        let city = req.body.city;
        let password = req.body.password;

        // Check if username or email already exists in XAMPP
        let userExists = await UserModel.findOne({ where: { email } }) || await UserModel.findOne({ where: { username } });

        if (userExists !== null) {
            return res.status(400).json({ message: "Username or Email already registered" });
        } else {
            // Save clean user details to the table
            await UserModel.create({ username, email, number, states, city, password });
            return res.status(201).json({ Res: "Success" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const loginUser = async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        // Search for user profile record
        let user = await UserModel.findOne({ where: { username } });

        if (user === null) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            // Validate flat string password match
            if (password !== user.password) {
                return res.status(400).json({ message: "Invalid username or password" });
            } else {
                return res.status(200).json({
                    Res: "Success",
                    username: user.username,
                    email: user.email,
                    number: user.number,
                    states: user.states, // Matches your model column name schema
                    city: user.city
                });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
