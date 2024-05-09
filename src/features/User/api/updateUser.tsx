import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UserForUpdateDto } from "../type";
import { userKeys } from "./user.Keys";

const updateUser = async (id: string, data: UserForUpdateDto) => {
  const axios = await clients();
  return axios.put(`/users/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: UserForUpdateDto;
}

export function useUpdateUser(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedUser }: UpdateProps) =>
      updateUser(id, updatedUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(userKeys.lists());
        queryClient.invalidateQueries(userKeys.details());
      },
      ...options,
    }
  );
}
