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
    const userId = new ObjectId(id);

    const { title, description } = inputs;

    const user = await IssueModel.findById(userId);

    if (!user) throw new Error("User not found");

    await IssueModel.updateOne(
      { _id: userId },
      {
        $set: {
          title,
          description,
        },
      }
    );

    const updatedUser = await IssueModel.findOne(
      { _id: userId },
      {
        title: 1,
        description: 1,
      }
    );

    return updatedUser;
  }

  public async removeIssue(id: string) {
    return await IssueModel.findOneAndRemove({ _id: new ObjectId(id) });
  }
}

const issueService = new IssueService();

export default issueService;
