import { useSelector } from "react-redux";
import { listUsers } from "./UserSlice";
import { UserDetail } from "./UserDetail";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Table, Text, Loader } from '@mantine/core';
import { UserForm } from "./UserForm";
import { useUsers } from "./api/getListUser";
import { FormUser } from "./components/FormUser";


export const UserList = () => {
    //const users = useSelector(listUsers);
    const { data: users, isLoading, isSuccess, isError } = useUsers({
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
                    <Table.Tbody className="table-body">

                        {isLoading && 
                            <Table.Tr>
                                <Table.Td colSpan={3} aria-colspan={3}>
                                    <div className="align-center">
                                        <Loader color="orange" />
                                    </div> 
                                </Table.Td> 
                            </Table.Tr>
                        }

                        {isSuccess && userData?.map((user,index)=>(
                            <UserDetail key={index} user={user}/>
                        ))}
                        
                        {isError && <Table.Tr><Table.Td colSpan={3} aria-colspan={3}><Text className="align-center" c="red">
                            Opss une erreur c'est produite lors de la recuperation des utilisateurs
                        </Text></Table.Td> </Table.Tr>}

                   
                    </Table.Tbody>
                </Table>
            </>
            }
            <Modal
                opened={opened}
                onClose={close}
                closeOnClickOutside
                draggable
                
                title="Ajouter un utilisateur"
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <FormUser close={close} />
            </Modal>
        </div>
    );
}