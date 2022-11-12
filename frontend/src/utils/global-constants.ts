import { DateTime } from "luxon";

export type Notes = {
  name: string;
  tags: string[];
};

export type ProjectTimelineDeadline = {
  deadline: DateTime;
  description: string;
  people: string[];
  completed: boolean;
};

export const apiEndpoint = "http://localhost:8001/";
