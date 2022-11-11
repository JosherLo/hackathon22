import axios, { AxiosError } from "axios";

const apiFetcher = axios.create({
  baseURL: "http://localhost:8001/"
}); // change this later

export const checkUser = async (username: string, password: string): Promise<boolean> => {
  // try {
  //   await apiFetcher.get("auth/", {
  //     params: {
  //       name: username,
  //       pass: password
  //     }
  //   });
  //   // request succeeded => correct
  //   return true;
  // } catch (e) {
  //   console.log(e);
  //   // oops
  //   return false;
  // }
  return true;
}

export const createUser = async (username: string, password: string): Promise<[boolean,string]> => {
  try {
    await apiFetcher.put("auth/", {
      name: username,
      pass: password
    });
    // request succeeded => created
    return [true, "user created"];
  } catch (e) {
    const err = e as AxiosError;
    return [false, err.message];
  }
}