import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import "./Post.css"
const Post = ({ post }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">
                Posted by: {post.userProfile.displayName}
            </p>
            <img className="postImageC" src={post.imageLocation} />
            <CardBody>
                <p>
                    <Link to={`/posts/${post.id}`}>
                        <strong>{post.title}</strong>
                    </Link>
                </p>

                <p>Category: {post.category.name}</p>
            </CardBody>
        </Card>
    );
};
export default Post;