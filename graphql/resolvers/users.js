const User = require("../../Models/User");

module.exports = {
    Mutation: {
        register(_, args, context, info) {
            //TODO: validate user data
            //TODO: Make sure user doesn`t already exists
            //TODO: hash password and create an auth token
        }
    }
}