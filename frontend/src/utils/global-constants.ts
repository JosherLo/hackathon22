import { DateTime } from "luxon";

export type Notes = {
  name: string;
  tags: string[];
};

export type ProjectTimelineDeadline = {
  deadline: string;
  description: string;
  people: string[];
  completed: boolean;
};

export type ProjectType = {
  class: string,
  people: string[],
  description: string,
  deadlines: {[key: string]: ProjectTimelineDeadline},
}

export const apiEndpoint = "http://localhost:8001/";
