import { React } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { deleteTag } from "../../modules/tagManager";
import { useHistory } from "react-router";

const Tag = ({ tag, getTags }) => {
    const history = useHistory()
    const deletetag = (evt) => {
        evt.preventDefault() 
        var result = window.confirm(`Are you sure you want to delete ${tag.name}?`);
        if (result) {
            deleteTag(tag.id).then(()=> getTags())
        }

    }

    return (
        <Card>
            <CardBody>
            <div className="TagList">
                <label style={{width: "10em"}}>{tag.name} </label>
                <button onClick={()=> history.push(`/tag/edit/${tag.id}`)} style={{width: "5em",marginLeft:".5rem"}}>Edit</button>
                <button onClick={deletetag} style={{width: "5em",marginLeft:".5rem"}}>Delete</button>
                </div>
            </CardBody>
        </Card>
    )
}

export default Tag;