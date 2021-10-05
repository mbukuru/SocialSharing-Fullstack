import axios from "axios";

const url = "https://socialsharing-fullstack.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const upvotePost = (id) => axios.patch(`${url}/${id}/upvotepost`);
export const downvotePost = (id) => axios.patch(`${url}/${id}/downvotepost`);