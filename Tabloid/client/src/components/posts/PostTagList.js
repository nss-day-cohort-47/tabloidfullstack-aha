import React, { useState, useEffect, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { useParams } from 'react-router';
import PostTagCard from "./PostTagCard";
import { PostContext } from "../../modules/PostManager.js";
import { getAllPostTags, getAllTags, addPostTag } from "../../modules/tagManager";

const PostTagList = () => {
    const [posttags, setPostTags] = useState([]);
    const [tags, setTags ] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { id } = useParams();
    const [post, setPost] = useState();
    const { getPostById } = useContext(PostContext);

    const getTags = () => {
        getAllTags().then(taglist => {setTags(taglist)
        });
    }

    const getPostTags = () => {
        getAllPostTags(id).then(taglist => {
            setPostTags(taglist)
           
        });
    }

    const addTag = (event) => {
        event.preventDefault();
        let selectedValue = event.target.value
        if(selectedValue !== 0)
        {
            addPostTag(selectedValue, id)
            .then(()=> getPostTags()).then(()=>getTags())
        }
        
    }

    useEffect(() => {
        getPostById(id).then(setPost);
    }, []);

    useEffect(()=>{
        getPostTags()
        
    }, [])

    useEffect(()=>
    {
        getTags()
    },[])

    return (
        <div className="container">
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/Tag">Tags: {post?.title}</NavbarBrand>
                <NavbarToggler onClick={toggle} />

                <Nav className="mr-auto" navbar>
                    <React.Fragment>
                        <NavItem>
                            <NavLink tag={RRNavLink} to={`/posts/${id}`}>Close</NavLink>
                        </NavItem>
                    </React.Fragment>
                </Nav>

            </Navbar>
            <div>
            <select name="typeId" id="typeId" onChange={addTag} >
                        <option defaultValue="0">Add tag</option>
                        {tags.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </select>
            </div>
            <div>
                <div>
                    <div className="TagList">
                        <label style={{ width: "12em" }}>Name </label>
                        <label style={{ width: "10em", marginLeft: ".5rem" }}>Remove Tag</label>
                    </div>
                    {posttags.map((tag) => (
                        <PostTagCard post={post} tag={tag} key={tag.id} getTags={getTags} getPostTags={getPostTags} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default PostTagList;