const axios = require('axios')

module.exports = async (req, res) => {
    const slug = req.params.slug
    let postData = {}

    const query = `
        query postBySlug($slug: String!) { 
            postBySlug( slug: $slug ) {
                id,
                slug,
                title,
                body
                
            }
        }`

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            { 
                query,
                variables: {
                    slug
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });   
            
        postData = data.data.quizBySlug

        console.log(postData)

        console.log(postData)
        res.render('post', { user: req.verifiedUser.user, post: postData });
    } catch(e) {
        console.log(e)
        res.redirect('/')
    }   

}