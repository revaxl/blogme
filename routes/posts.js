import { Router } from 'express';
import Post from '../models/post';

const router = Router();

// routes blog posts
router.get('/', (req, res) => {
  console.log('get posts');
  Post.find()
    .then(posts => res.json(posts))
    .catch(error => res.json(error));
  // res.json({ message: 'posts' });
});

router.get('/:id', (req, res) => {
  Post.findById({ _id: req.params.id })
    .then(post => res.json(post))
    .catch(error => res.json(error));
  // res.json({ message: 'post' });
})

router.post('/', (req, res) => {
  console.log(req.body);
  const post = new Post();
  post.title = req.body.title;
  post.author = req.body.author;
  post.content = req.body.content;
  post.save()
    .then(newPost => res.json(newPost))
    .catch(error => res.json(error));
  // res.json({ post: req.body });
});

router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate({ _id: req.params.id},
  {
    $set: {title: req.body.title, author: req.body.author, content: req.body.content}
  },
  { new: true })
  .then(updatedPost => res.json(updatedPost))
  .catch(error => res.json(error));

  // res.json({ message: 'post update' });
});

router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove({ _id: req.params.id })
    .then(() => res.json({ message: 'delete' }))
    .catch(error => res.json(error));
  
});

export default router;