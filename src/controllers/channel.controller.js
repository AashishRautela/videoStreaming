const Video=require("../models/video.model");
const User = require("../models/user.model.js");
const { asyncHandler } = require("../utils/asyncHandler");



module.exports.channelDetail = asyncHandler(async (req, res, next) => {
    const { userName } = req.params;

    if (!userName?.trim()) {
        return res.status(400).send({
            success: false,
            message: "Request Data missing",
        });
    }

    const user = await User.findOne({ "userName": userName });

    if (!user) {
        return res.status(404).send({
            success: false,
            message: "User not found",
        });
    }

    const channel = await User.aggregate([
        {
            $match:
                { userName: userName }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"channel",
                as:"subscribers"
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"subscriber",
                as:"subscribedTo"
            }
        },
        {
            $addFields: {
                totalSubscribers: { $size: "$subscribers" },
                totalSubscribedTo: { $size: "$subscribedTo" },
                isSubscribed:{
                    $cond:{
                        if:{$in :[req.user?._id,"$subscribers.subscriber"]},
                        then :true,
                        else:false
                    }
                }
            }
        },
        {
            $project:{
                userName:1,
                fullName:1,
                avatar:1,
                totalSubscribers:1,
                totalSubscribedTo:1,
                isSubscribed:1,
                coverImage:1
            }
        }
    ]);
    
    return res.status(200).send({
        success: true,
        data: channel[0],
        message:"User data fetched"
    });
});