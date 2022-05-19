import User from "../models/user";

export const becomeHotelManager = async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email})

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    user.role.push("hotel-owner");

    const newUser = await User.findOneAndUpdate({email}, {role: user.role}, {new: true})

    return res.status(200).json({
        message: "User is now a hotel manager",
        user: newUser
    })

}

export const getUserDetails = async (req, res) => {
    const {userId} = req.query;

    console.log(userId);

    const user = await User.findById(userId);

    return res.status(200).json({
        user
    })

}
