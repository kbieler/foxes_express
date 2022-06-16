
const { GraphQLObjectType, GraphQLInputObjectType, 
	GraphQLID, GraphQLString, GraphQLList, GraphQLInt, 
	GraphQLBoolean, GraphQLFloat } = require('graphql')

const { User, Post } = require('../models')

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        posts: {
            type: GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({userId: parent.id})
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post type',
    fields: () => ({
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        userId: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.id)
            }
        }

    })
});

module.exports={
    UserType,
    PostType
}