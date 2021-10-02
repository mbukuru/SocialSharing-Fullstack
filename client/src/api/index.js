import axios from "axios";

const url = "http://localhost:5000/posts"; // change this URL once you deploy the backend to Heroku

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const upvotePost = (id) => axios.patch(`${url}/${id}/upvotepost`);
export const downvotePost = (id) => axios.patch(`${url}/${id}/downvotepost`);