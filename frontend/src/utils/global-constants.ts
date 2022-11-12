export type Notes = {
  name: string;
  tags: string[];
};

export type ProjectTimelineDeadline = {
  deadline: string,
  description: string,
  people: string[],
  completed: boolean,
};

export const apiEndpoint = "http://localhost:8001/";
