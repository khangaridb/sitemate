import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { IssueType } from "./issue.types";

const UpdateIssueModal = ({ visibility, issue, onClose }: { visibility: boolean; issue?: IssueType; onClose: () => void }) => {
  const [title, setTitle] = React.useState(issue?.title ?? "");
  const [description, setDesc] = React.useState(issue?.description ?? "");

  const onSave = () => {
    axios
      .post(`http://localhost:5000/api/issue/update/${issue?._id}`, {
        title,
        description,
      })
      .then(({ data }) => {
        onClose && onClose();
      })
      .catch((err) => {});
  };

  return (
    <Modal show={visibility}>
      <Modal.Header closeButton>
        <Modal.Title>Update Issue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control defaultValue={title} onChange={(e) => setTitle(e.currentTarget.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control defaultValue={description} onChange={(e) => setDesc(e.currentTarget.value)} as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onSave()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateIssueModal;
