import { React } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { deletePostTag } from "../../modules/tagManager";


const Tag = ({ tag, getPostTags, getTags, post }) => {
    const deletetag = (evt) => {
        evt.preventDefault() 
        var result = window.confirm(`Are you sure you want to remove ${tag.name} from ${post.title}?`);
        if (result) {
            deletePostTag(tag.id, post.id).then(()=> getPostTags()).then(()=>getTags())
        }

    }

    return (
        <Card>
            <CardBody>
            <div className="TagList">
                <label style={{width: "10em"}}>{tag.name} </label>
                <button onClick={deletetag} style={{width: "10em",marginLeft:".5rem"}}>Remove Tag</button>
                </div>
            </CardBody>
        </Card>
    )
}

export default Tag;