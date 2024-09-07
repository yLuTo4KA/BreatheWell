const mongoose = require("mongoose");
const database = module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        mongoose.connect(process.env.DB_URL);
        console.log('connect success! 🧠🧠🧠')
    } catch (error) {
        console.log(error);
    }

}

database();


const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
        default: '',
        trim: true,
    },
    first_name: {
        type: String,
        required: false,
        default: null,
        trim: true,
    },
    last_name: {
        type: String,
        required: false,
        default: null,
        trim: true,
    },
    language_code: {
        type: String,
        required: false,
        default: "eng",
        trim: true
    },
    avatar: {
        type: String,
        required: false,
        trim: true
    },
    ref_key: {
        type: String,
        required: false,
        default: null
    },
    invited: {
        type: Boolean,
        required: false,
        default: false
    },
    subscription: {
        type: Boolean,
        required: false,
        default: false,
    },
    subExpired: {
        type: Date,
        required: false
    },
    last_visit: {
        type: Date,
        required: false,
        default: Date.now
    }
});





const UserModel = new mongoose.model("User", UserSchema);

module.exports = {UserModel};