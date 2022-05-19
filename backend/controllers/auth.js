import User from "../models/user";

export const register = async (req, res) => {
    const {name, email} = req.body;

    const user = await User.findOne({email});
    if (user) {
        return res.status(200).json(user);
    }

    const newUser = new User({name, email});

    await User.create(newUser);

    res.status(200).json({
        user: newUser
    });
}

export const login = async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email});

    return res.status(200).json({
        user
    });

}
