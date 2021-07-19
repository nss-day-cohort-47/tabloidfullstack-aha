import React, { useEffect, useState, useContext } from "react";
import Comment from "./Comment";
import { useParams, Link, NavLink as RRNavLink } from "react-router-dom";
import { PostContext } from "../../modules/PostManager";
import { Navbar, Nav, Button, NavLink, NavbarBrand, NavbarToggler, NavItem, Collapse } from "reactstrap";
import { getAllCommentsByPost } from "../../modules/commentManager";

const CommentList = () => {
    const [post, setPost] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [comments, setComments] = useState([]);
    const { getPostByIdWithComments } = useContext(PostContext);
    const { id } = useParams();

    const getPost = () => {
        getPostByIdWithComments(id).then(post => setPost(post));
    }

    const getComments = () => {
        getAllCommentsByPost(id).then(comments => setComments(comments));
    }

    useEffect(() => {
        getPost();
    }, [comments]);

    return (
        <div className="container">
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to={`/comment/${post.id}`}>Comments</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <React.Fragment>
                            <NavItem>
                                <NavLink tag={RRNavLink} to={`/comment/${post.id}/add`}>Add Comment</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to={`/posts/${post.id}`}>Close</NavLink>
                            </NavItem>
                        </React.Fragment>
                    </Nav>
                </Collapse>
            </Navbar>
            {/* <div className="UserList">
                <label style={{ width: "12em" }}>Comment</label>
            </div> */}
            {post.comments?.map((comment) => (
                <Comment comment={comment} post={post} getComments={getComments} key={comment.id} />
            ))}
            <Link to={`/comment/${post.id}/add`}>
                <Button>Add Comment</Button>
            </Link>
        </div>
    );
}

export default CommentList;