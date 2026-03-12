import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponce.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const { fullName, email, password } = req.body;
    console.log("email: ", email);

    if (
        [fullName, username, email, password].some((field) => !field || field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required and must not be empty");
    }
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new ApiError(409, "User with the same email or username already exists");
    }
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadToCloudinary(avatarLocalPath, "avatars")
    const coverImage = await uploadToCloudinary(coverImageLocalPath, "coverImages")

    if (!avatar || !avatar.secure_url) {
        throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }

    if (!coverImage || !coverImage.secure_url) {
        throw new ApiError(500, "Failed to upload cover image to Cloudinary");
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.secure_url,
        coverImage: coverImage.secure_url || ""
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(200, "User registered successfully", createdUser)
    );

});

export { registerUser };