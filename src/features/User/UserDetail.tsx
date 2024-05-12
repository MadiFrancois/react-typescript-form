import { ActionIcon, Modal, Table } from "@mantine/core";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "./UserSlice";
import { MdDeleteForever, MdEdit, MdEditSquare } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
import { UserForm } from "./UserForm";
import { useDeleteUser } from "./api/deleteUser";
import { Notifications } from "../../components/notifications/Notifications";
import { UserDto } from "./type";
import { FormUser } from "./components/FormUser";

interface UserDetailProps{
    user: UserDto;
}


const UserDetail = ({user}:UserDetailProps) =>  {
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);

    const deleteUserApi = useDeleteUser();
    function deleteUser(id: string) {
        deleteUserApi
        .mutateAsync(id)
        .then(() => {
            Notifications.success("User deleted successfully");
        })
        .catch((e:any) => {
            Notifications.error("There was an error deleting the User");
            console.error(e);
        });
    }
    return (
        <>
        <Table.Tr>
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>{user.age}</Table.Td>
            <Table.Td>
                <ActionIcon 
                    onClick={() => deleteUser(user.id)} 
                    variant="light" 
                    aria-label="Delete" 
                    style={{marginRight:"10px"}}
                    color="red">
                    <MdDeleteForever style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
                <ActionIcon 
                    variant="light" 
                    aria-label="Delete"
                    onClick={open} 
                    color="blue">
                    <FaUserEdit style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
        <Modal
            opened={opened}
            onClose={close}
            title="Ajouter un utilisateur"
            transitionProps={{ transition: 'fade', duration: 200 }}
        >
            <FormUser  userData={user} close={close} />
        </Modal>
        </>
    );
}

export {UserDetail}