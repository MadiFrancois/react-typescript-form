import { clients } from "../../../lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { UserDto } from "../type";
import { userKeys } from "./user.Keys";

interface delayProps {
  hasArtificialDelay?: boolean;
  delayInMs?: number;
}

interface getListUserApiProps extends delayProps {
}
const getUsers = async ({
  hasArtificialDelay,
  delayInMs,
}: getListUserApiProps) => {

  delayInMs = hasArtificialDelay ? delayInMs : 0;

  const [json] = await Promise.all([
    clients().then((axios) =>
      axios
        .get(`/users`)
        .then((response: AxiosResponse<UserDto[]>) => {

          return {
            data: response.data as UserDto[],
          };
          
        })
    ),
    new Promise((resolve) => setTimeout(resolve, delayInMs)),
  ]);
  return json;
};

interface getListUserHookProps extends  delayProps {}
export const useUsers = ({
  hasArtificialDelay = false,
  delayInMs = 500,
}: getListUserHookProps) => {
  
  return useQuery(userKeys.list(""), () =>
    getUsers({ hasArtificialDelay, delayInMs })
  );
};