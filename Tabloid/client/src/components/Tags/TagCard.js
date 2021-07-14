import { React } from "react";
import { Card, CardBody, Button } from "reactstrap";

const Tag = ({ tag }) => {
    return (
        <Card>
            <CardBody>
                <h3>{tag.name}</h3>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </CardBody>
        </Card>
    )
}

export default Tag;