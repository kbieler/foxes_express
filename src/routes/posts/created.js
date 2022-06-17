module.exports = async (req, res) => {
    res.render('post-success', { slug: req.params.slug })
}