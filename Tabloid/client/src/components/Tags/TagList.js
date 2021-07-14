import React, {useEffect, useState} from "react";
import TagCard from "./TagCard";
import { getAllTags } from "../../modules/tagManager";

const TagList = () => {
    const[tags, setTags] = useState([]);

    const getTags = () => {
        getAllTags().then(taglist => {setTags(taglist)
        console.log(taglist)});
    }

    useEffect(()=> {
        getTags();
    }, [])

    return (
        <div className="row justify-content-center">
            {tags.map((tag) => (
                <TagCard tag={tag} key={tag.id} getTags={getTags}/>
                ))}
        </div>
    )
}

export default TagList;