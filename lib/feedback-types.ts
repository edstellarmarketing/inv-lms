export type StageStatus = "approved" | "changes_required" | "pending";

export interface Stage {
  title?: string;
  status: StageStatus;
  statusBy: string | null;
  statusByName: string | null;
  statusAt: string | null;
  statusNote: string | null;
}

export interface Comment {
  id: string;
  scope: "step" | "stage";
  stageId: string;
  stepId: string | null;
  text: string;
  author: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  edited: boolean;
  resolved: boolean;
  resolvedBy: string | null;
  resolvedByName: string | null;
  resolvedAt: string | null;
  resolutionNote: string | null;
}

export interface Store {
  version: 1;
  updatedAt: string;
  stages: Record<string, Stage>;
  comments: Comment[];
}
