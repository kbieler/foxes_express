const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')
const { UserType, PostType } = require('./types')
const { User, Post } = require('../models')

const users = {
    type: new GraphQLList(UserType),
    description: 'Query all users in the database',
    resolve(parent, args) {
        return User.find()
    }
}

const postBySlug = {
    type: PostType,
    description: 'Query post by slug value',
    args: {
        slug: { type: GraphQLString }
    },
    async resolve(parent, args) {
        return Post.findOne({ slug: args.slug })
    }
}

module.exports= { users, postBySlug}