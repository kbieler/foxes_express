const axios = require('axios')
const e = require('express')

module.exports = async (req, res) => {
    const postInputs = req.body
    
    const postData = {
        userId: req.verifiedUser.user._id,
        title: postInputs['postTitle'],
        body: postInputs['postBody'],
        
    }

    

    const mutation = `
        mutation createQuiz($userId: String!, $title: String!, $body: String!) { 
            createPost( userId: $userId, title: $title, body: $body)
        }`

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            { 
                query: mutation,
                variables: postData
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });   
        console.log(data)
        quizSlug = data.data.createPost
    } catch(e) {
        console.log(e)
    }   

    res.redirect(`/post/success/${quizSlug}`)
}