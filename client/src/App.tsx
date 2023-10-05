import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Button } from "react-bootstrap";
import { IssueType } from "./issues/issue.types";
import Issue from "./issues/Issue";
import CreateIssueModal from "./issues/CreateIssue";

const marginTop = "20px";

const App = () => {
  const [issues, setIssues] = React.useState([]);
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  const fetchIssues = React.useCallback(() => {
    axios
      .get("http://localhost:5000/api/issue/list")
      .then(({ data }) => {
        setIssues(data?.result ?? []);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <div className="App">
      <Container className="container">
        <Row>
          <Form.Control placeholder="Type to search..." />
        </Row>

        <Row style={{ marginTop }}>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            Create
          </Button>
        </Row>

        <Row className="justify-content-md-center" style={{ marginTop }}>
          {issues.map((issue: IssueType) => {
            return <Issue issue={issue} updateCallback={fetchIssues} />;
          })}
        </Row>
      </Container>

      <CreateIssueModal
        visibility={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          fetchIssues();
        }}
      />
    </div>
  );
};

export default App;
