import React from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { IssueType } from "./issue.types";
import UpdateIssueModal from "./UpdateIssue";

const Issue = ({ issue, updateCallback }: { issue: IssueType; updateCallback: () => void }) => {
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const { _id, title, description } = issue;

  const onRemoveClick = () => {
    axios
      .post(`http://localhost:5000/api/issue/remove/${issue?._id}`, {
        title,
        description,
      })
      .then(() => {})
      .catch((err) => {});
  };

  return (
    <React.Fragment>
      <Card key={_id} style={{ width: "18rem", margin: "10px" }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>

          <Button variant="primary" onClick={() => setShowUpdateModal(true)}>
            Update
          </Button>

          <Button
            variant="secondary"
            style={{ marginLeft: "20px" }}
            onClick={() => {
              onRemoveClick();
              updateCallback();
            }}
          >
            Remove
          </Button>
        </Card.Body>
      </Card>

      <UpdateIssueModal
        issue={issue}
        visibility={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          updateCallback();
        }}
      />
    </React.Fragment>
  );
};

export default Issue;
