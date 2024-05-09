import { clients } from "../../../lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { userKeys } from "./user.Keys";
import { UserDto } from "../type";

const getUser = async (id: number) => {
  const axios = await clients();

  return axios
    .get(`/users/${id}`)
    .then((response: AxiosResponse<UserDto>) => response.data);
};

export const useGetUser = (id: number | null | undefined) => {
  return useQuery(userKeys.detail(id!), () => getUser(id!), {
    enabled: id !== null && id !== undefined,
  });
};