import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UserDto, UserForCreationDto } from "../type";
import { userKeys } from "./user.Keys";

const addUser = async (data: UserForCreationDto) => {
  const axios = await clients();

  return axios
    .post("/users", data)
    .then((response:any) => response.data as UserDto);
};

export function useAddUser(
  options?: UseMutationOptions<UserDto, AxiosError, UserForCreationDto>
) {
  const queryClient = useQueryClient();

  return useMutation(
    (newPlateform: UserForCreationDto) => addUser(newPlateform),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(userKeys.lists());
      },
      ...options,
    }
  );
}

