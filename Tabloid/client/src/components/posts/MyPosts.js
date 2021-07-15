import React, { useEffect, useState } from 'react';
import { getAllUserPosts } from '../../modules/PostManager';
import Post from "./PostList";

const MyPosts = () => {

  const [ posts, setPosts ] = useState([]);


  const fetchUserPosts = () => {
    return getAllUserPosts().then(posts => setPosts(posts))
  }


  useEffect(() => {
    fetchUserPosts();
  }, []);
console.log()
  return (
    <>
      <h1>My Posts</h1>
      <div className="container">
        <div className="row justify-content-center">
          { posts.map((post) => (
            <Post post={ post } key={ post.id } />
          )) }
        </div>
      </div>
    </>
  )

};

export default MyPosts; 