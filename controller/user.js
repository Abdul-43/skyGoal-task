import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/userSchema.js";

//signup 
export const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });
        await user.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        // console.error(error);
        res.status(500).send("Error creating user");
    }
};

//login
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.email });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send("Invalid password");
        }
        const token = jwt.sign({ id: user._id }, 'secretkey');
        res.status(200).send({ token: token });
    } catch (error) {
        // console.error(error);
        res.status(500).send("Error logging in");
    }
}

//userdetails
export const userDetails = async (req, res) => {
    try {
        const userId = req.user && req.user.id;
        if (!userId) {
            return res.status(401).send("Unauthorized");
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (error) {
        // console.error(error);
        res.status(500).send("Error fetching user details");
    }
}