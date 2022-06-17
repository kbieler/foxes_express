const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLInt } = require('graphql')
const { UserType, PostType } = require('./types')
const { User, Post } = require('../models')
const { createJwtToken } = require('../util/auth')

const register = {
    type: GraphQLString,
    args: {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    },
    async resolve(parent, args) {
        
        const checkUser = await User.findOne({ email: args.email })
        if (checkUser) {
            throw new Error("User with this email address already exists")
        }

        const {username, email, password} = args
        const user = new User({username, email, password})

        await user.save()

        const token = createJwtToken(user)
        return token
    }
};

const login = {
    type: GraphQLString,
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email })
        if (!user || args.password !== user.password) {
            throw new Error("Invalid credentials")
        }

        const token = createJwtToken(user)
        return token
    }
};

const createPost = {
    type: GraphQLString,
    args: {
        questions: { 
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType)))
        },
        title: {
            type: GraphQLString
        },
        body: {
            type: GraphQLString
        },
        userId: {
            type: GraphQLString
        }
    },
    async resolve(parent, args) {
        let slugify = args.title.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-')
        let fullSlug = ''

        while (true) {
            let slugId = Math.floor(Math.random()*10000)
            fullSlug = `${slugify}-${slugId}`

            const existingPost = await Post.findOne({slug: fullSlug})
            
            if (!existingPost)
                break;
        }

        const post = new Post({
            title: args.title,
            slug: fullSlug,
            body: args.bpdy,
            userId: args.userId
        })

        await post.save()

        return post.slug
    }
};


module.exports = { register, login, createPost}