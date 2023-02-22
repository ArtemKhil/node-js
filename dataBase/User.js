const {model, Schema} = require('mongoose');
const {oauthServices} = require("../services");

const userSchema = new Schema({
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    password: {type: String},
    phone: {type: String, required: true},
    age: {type: Number, required: true, default: 18},
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.virtual('fullName').get(function () {
    return `${this.name} Khilchenko`;
});

userSchema.statics = {
    testStatic() {
        console.log('Static');
    },
    async createUserWithHashPassword(userObject = {}) {
        const hashPassword = await oauthServices.hashPassword(userObject.password);

        return this.create({...userObject, password: hashPassword});

        },
};

userSchema.methods = {
    testMethod() {
        console.log('Method');
    },
    async comparePasswords(password) {
        await oauthServices.comparePasswords(this.password, password);
    },
};


module.exports = model('User', userSchema);