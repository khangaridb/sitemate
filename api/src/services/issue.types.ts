export type CreateIssueInput = {
  title: string;
  description?: string;
};

export type UpdateIssueInput = CreateIssueInput & {
  title?: string;
};
