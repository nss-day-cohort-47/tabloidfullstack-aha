import {React, useEffect, useState} from "react";
import { getSubscribedPosts } from "../modules/subscriptManager.js";
import  Post from "./posts/PostListCard.js"
import thing from "./TABLOIDBOLD.jpg"
import "./Hello.css";

export default function Hello() {

  const [posts, setPosts] = useState([])

  const getUserSubscription = () => {
    getSubscribedPosts().then(posts => setPosts(posts))
  }

  useEffect(()=>{
    getUserSubscription()
  },[])

  return (
    <div>
    <img src={thing}  className="centerme" alt="user img"/>
    <div>
      <h2>Subscriptions</h2>
        {posts.map((post) => {
                            return <Post key={post.id} post={post} />;
                        })}

    </div>
    </div>
  );
}

