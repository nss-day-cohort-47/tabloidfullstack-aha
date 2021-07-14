import { React } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { deleteTag } from "../../modules/tagManager";

const Tag = ({ tag, getTags }) => {
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
                <h3>{tag.name}</h3>
                <Button>Edit</Button>
                <Button onClick={deletetag}>Delete</Button>
            </CardBody>
        </Card>
    )
}

export default Tag;