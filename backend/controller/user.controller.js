const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

async function registerUser(req, res){

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    const emailExist = await user.findOne({ email: email });

    if (emailExist) {
        return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await user.create({
        name: name,
        email: email,
        password: hashedPassword,
    });
    if (!User) {
        return res
        .status(500)
        .json({ success: false, message: "User not created" });
    }
    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });

    res.cookie("token", token, {
        secure:false,
        httpOnly: true, //js cannot read cookie directly by document.cookie now
        maxAge: 3 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
        success: true,
        message: "User created",
        userDetails: {
        name: name,
      email: email,
    },
  })
};


async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are mandatory" });
        }

        const   User = await user.findOne({ email: email });
        if (!User) {
        return res
            .status(400)
            .json({ success: false, message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, User.password);
        if (!isPasswordMatch) {
        return res
            .status(400)
            .json({ success: false, message: "Email or Password is Incorrect"});
        }

        const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
        });

        res.cookie("token", token, {
            secure:false,
            httpOnly:true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
    
        return res.status(200).json({
            success: true,
            message: "Login Successfull",
            userDetails: {
                name: User.name,
                email: User.email,
            },
        });
    } 
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}



    module.exports = {
        registerUser,
        loginUser,
    }