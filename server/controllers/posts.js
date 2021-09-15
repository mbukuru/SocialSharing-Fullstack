import Post from "../models/Post.js";
import mongoose from "mongoose";


// GET ALL POSTS

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts); // 200 OK
  } catch (error) {
    res.status(404).json({ message: error.message }); // 404 Not Found
  }
};

// GET A SINGLE POST

export const getPost = async (req, res) => {
 const { id: _id } = req.params;
  try {
    const post = await Post.findById(_id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: error.message }); // 404 Not Found
  }
};


// CREATE A POST

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);

  try {
    await newPost.save();
    res.status(201).json(newPost); // 201 Created
  } catch (error) {
    res.status(409).json({ message: error.message }); // 409 Conflict
  }
};

// UPDATE A POST

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with the id ${_id} exists`); // 404 Not Found
  }

  const updatedPost = await Post.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

// DELETE A POST

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with the id ${_id} exists`); // 404 Not Found
  }

  await Post.findByIdAndRemove(_id);

  res.json({ message: "Post deleted successfully" });
};

// UPVOTE

export const upvotePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`); // 404 Not Found
  }

  const post = await Post.findById(id);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { upvotes: post.upvotes + 1 },
    { new: true }
  );

  res.json(updatedPost);
};

// DOWNVOTE

export const downvotePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with the id ${id} exists`); // 404 Not Found
  }

  const post = await Post.findById(id);
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { upvotes: post.upvotes - 1 },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};