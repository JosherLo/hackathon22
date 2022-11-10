import axios from "axios";

export const checkUser = async (username: string, password: string): Promise<boolean> => {
  // const res = await axios.get("URL");
  // return res.data.auth as boolean;
  return true;
  // return false;
}

export const createUser = async (username: string, password: string): Promise<[boolean,string]> => {
  // const res = await axios.get("URL");
  // return [res.data.auth as boolean, res.data.msg as string];
  return [true, "user created"];
  // return [false, "Oops"];
}