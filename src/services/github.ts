import axios from "axios";
import { UserSchema, type User } from "../schemas/user";

export const githubApi = axios.create({
  baseURL: "https://api.github.com",
});

export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await githubApi.get(`/users/${username}`);

  const validatedData = UserSchema.parse(response.data);

  return validatedData;
};
