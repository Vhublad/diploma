const { getAllPosts, createPost, deletePost, findOnePost } = require('../database');

const router = require('express').Router();

// Route to get all posts
router.get('/posts', async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});


// Route to add a Post
router.post('/posts', async (req, res, next) => {  const { title, author, description, text } = req.body;
  try {
    const candidate = await findOnePost(title);
    
    if(candidate){
        return res.status(400).json({
            message: 'Post with this title has alrady exist.'
        })
    }
    

    const post = await createPost({ title, author, description, text });
    res.json(post);
  } catch (error) {
    next(error);
  }
});


// Route to delete a post by ID
router.delete('/posts/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await deletePost(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
});


module.exports = router;