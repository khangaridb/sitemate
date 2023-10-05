import mongoose from "mongoose";

const schemaName = "Issue";

export interface IssueType {
  title: string;
  description: string;
}

const schema = new mongoose.Schema<IssueType>(
  {
    title: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const IssueModel = mongoose.model<IssueType>(schemaName, schema);

export default IssueModel;
