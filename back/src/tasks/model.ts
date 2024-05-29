export enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  date: string;
  status: Status;
}

export interface TaskPayload {
  title: string;
  description: string;
  status: Status;
  email: string;
}