const UserModel = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const { PASSWORD_KEY } = process.env;

const addNewUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const duplicateEmail = await UserModel.findOne({ email: email });
        if (duplicateEmail) {
            return res.status(404).json({ message: "User not created, Email is dublicate", response: null });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new UserModel({ email: email, password: hashPassword });
        await user.save();
        console.log(user);
        const token = jwt.sign({ id: user.id }, PASSWORD_KEY, { expiresIn: "30d" }); // в качестве ключа возьму id юзера
        const userToken = await UserModel.findOneAndUpdate({ id: user.id }, { token: token }, { new: true });
        return res.status(200).json({ message: "status 201", response: userToken });
    } catch (error) {
        return res
            .status(404)
            .json({ message: "User not created, i am sorry try again", response: null, error: error });
    }
};

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: `User ${email} not found`, response: null });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(404).json({ message: `User ${email} not found`, response: null });
        }
        const token = jwt.sign({ id: user.id }, PASSWORD_KEY, { expiresIn: "30d" });
        const loginSuccesfull = await UserModel.findOneAndUpdate({ email: email }, { token: token }, { new: true });
        return res.status(200).json({ message: "status 200", response: loginSuccesfull });
    } catch (error) {
        return res.status(404).json({ message: `User ${req.body.email} not found`, response: null, error: error });
    }
};

const getCurentUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById({ _id: req.userId });
        if (!user) {
            return res.status(404).json({ message: `User not found`, response: null });
        }
        return res.status(200).json({ message: "status 200", response: user });
    } catch (error) {
        return res.status(404).json({ message: `User not found`, response: null, error: error });
    }
};

const updateSubscription = async (req, res, next) => {
    try {
        const { subscription } = req.body;
        const userSubscription = await UserModel.findByIdAndUpdate(
            { _id: req.userId },
            { subscription: subscription },
            { new: true }
        );
        if (!userSubscription) {
            return res.status(404).json({ message: `User not found`, response: null });
        }
        return res.status(200).json({ message: "status 200", response: userSubscription });
    } catch (error) {
        return res.status(404).json({ message: `User not found`, response: null, error: error });
    }
};

const logOutUser = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndUpdate({ _id: req.userId }, { token: "" }, { new: true });
        if (!user) {
            return res.status(404).json({ message: `User not found`, response: null });
        }
        return res.status(200).json({ message: "status 200", response: user });
    } catch (error) {
        return res.status(404).json({ message: `User not found`, response: null, error: error });
    }
};

module.exports = { getCurentUser, userLogin, addNewUser, updateSubscription, logOutUser };
