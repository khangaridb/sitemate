import { CreateIssueInput, UpdateIssueInput } from "./issue.types";
import IssueModel, { IssueType } from "../models/issue";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export class IssueService {
  public async createIssue(inputs: CreateIssueInput): Promise<IssueType> {
    const { title, description } = inputs;

    return await IssueModel.create({ title, description });
  }

  public async updateIssue(id: string, inputs: UpdateIssueInput): Promise<IssueType | null> {
    const issueId = new ObjectId(id);

    const { title, description } = inputs;

    const issue = await IssueModel.findById(issueId);

    if (!issue) throw new Error("Issue not found");

    await IssueModel.updateOne(
      { _id: issueId },
      {
        $set: {
          title,
          description,
        },
      }
    );

    const updatedIssue = await IssueModel.findOne(
      { _id: issueId },
      {
        title: 1,
        description: 1,
      }
    );

    return updatedIssue;
  }

  public async removeIssue(id: string) {
    return await IssueModel.findOneAndRemove({ _id: new ObjectId(id) });
  }

  public async getIssues(text?: string) {
    let query = {};

    if (text) {
      query = {
        $text: {
          $search: text,
        },
      };
    }

    return await IssueModel.find(query);
  }
}

const issueService = new IssueService();

export default issueService;
