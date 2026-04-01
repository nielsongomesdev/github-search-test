import axios from "axios";
import { z } from "zod";

import { UserSchema, type User } from "../schemas/user";
import { repositorySchema, type Repository } from "../schemas/repositorySchema";

export const api = axios.create({
  baseURL: "https://api.github.com",
});

export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await api.get(`/users/${username}`);
  return UserSchema.parse(response.data);
};

export const getUserRepositories = async (
  username: string,
  page: number = 1,
  perPage: number = 10,
  sort: string = "updated",
): Promise<Repository[]> => {
  const response = await api.get(`/users/${username}/repos`, {
    params: {
      page,
      per_page: perPage,
      sort,
    },
  });

  return z.array(repositorySchema).parse(response.data);
};
