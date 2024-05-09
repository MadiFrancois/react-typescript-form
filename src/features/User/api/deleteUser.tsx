import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { userKeys } from "./user.Keys";

async function deleteUser(id: number) {
  const axios = await clients();
  return axios.delete(`/users/${id}`).then(() => {});
}

export function useDeleteUser(
  options?: UseMutationOptions<void, AxiosError, number>
) {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(userKeys.lists());
      queryClient.invalidateQueries(userKeys.details());
    },
    ...options,
  });
}
