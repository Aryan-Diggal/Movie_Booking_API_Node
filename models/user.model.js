const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {USER_ROLE, USER_STATUS} = require("../utils/constants");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please fill a valid email"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    userRole: {
        type: String,
        required: true,
        enum: {
            values: [USER_ROLE.admin, USER_ROLE.client, USER_ROLE.customer],
            message: "Invalid User Role entered"
        },
        default: USER_ROLE.customer
    },
    userStatus: {
        type: String,
        required: true,
        enum: {
            values: [USER_STATUS.approved, USER_STATUS.pending, USER_STATUS.rejected],
            message: "Invalid User Status entered by the user"
        },
        default: USER_STATUS.approved
    }
}, {timestamps: true});

userSchema.pre("save", async function () {
    // A trigger to encrypt the password before saving it in the database
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
}); 

/**
 * This is going to be an instance method for user, to compare password
 * with the stored encrypted password
 * @param {*} plainPassword -> input password given by the user in sign in request
 * @returns boolean denoting whether passwords are same or not ?
 */
userSchema.methods.isValidPassword = async function (plainPassword) {
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword, currentUser.password);
    return compare;
}

const User = mongoose.model("User", userSchema);
module.exports = User;