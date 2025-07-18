import { User } from "../models/user.model";

// fetching all the users for the leaderboard in descending order of points

const getUsers = async ( req, res ) => {
    try {
        const users = await User.find().sort({points : -1});
        res.status(200).json({users, message : "users fetched successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Error while fetching the users"});
    }
}

// Adding a new user

const addUser = async ( req, res ) => {
    const user = req.body.user;

    
    try {
        // first we will check if user with this name already exist or not
        const isUserExists = await User.findOne({name : user.name});
        if(isUserExists) return res.status(401).json({message : "User with this name already exists"});

        const newUser = new User({
            name : user.name,
        });
        await newUser.save();
        return res.status(201).json({newUser, message : "user added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "An error occurred while creating a new user"});
    }
}

// points claiming

const claimPoints = async ( req, res ) => {
    const { userId } = req.body;
    
    try {
        const pointsToClaim = Math.floor(Math.random() * 10) + 1;

        const user = await User.findByIdAndUpdate(
            userId,
            { $inc: { points: pointsToClaim } },
            { new: true } // Returns the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log the claim in claimhistory collection
        const historyLog = new ClaimHistory({ userId, pointsClaimed: pointsToClaim });
        await historyLog.save();

        return res.json({ message: 'Points claimed!', pointsClaimed: pointsToClaim });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "something went wrong"});
    }
}