import { useSelector } from "react-redux";
import { listUsers } from "./UserSlice";
import { UserDetail } from "./UserDetail";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Table } from '@mantine/core';
import { UserForm } from "./UserForm";
import { useUsers } from "./api/getListUser";
import { FormUser } from "./components/FormUser";


export const UserList = () => {
    //const users = useSelector(listUsers);
    const { data: users, isLoading } = useUsers({
        hasArtificialDelay: true,
      });

      const userData = users?.data;

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div>
            <Button onClick={open}>Ajouter un utilisateur</Button>
            <br/>
            {userData?.length === 0 ? <>Aucun utilisateur n'est enregistré dans le store.</>:
            <>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Age</Table.Th>
                        <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {userData?.map((user,index)=>(
                            <UserDetail key={index} index={index} name={user.name} age={user.age}/>
                        ))}
                    </Table.Tbody>
                </Table>
            </>
            }
            <Modal
                opened={opened}
                onClose={close}
                title="Ajouter un utilisateur"
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <FormUser close={close} />
            </Modal>
        </div>
    );
}