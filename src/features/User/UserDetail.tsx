import { ActionIcon, Modal, Table } from "@mantine/core";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "./UserSlice";
import { MdDeleteForever, MdEdit, MdEditSquare } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
import { UserForm } from "./UserForm";

interface UserdetailProps{
    index: number;
    name: string;
    age?:number;
}
const UserDetail = ({index,name,age}:UserdetailProps) =>  {
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
        <Table.Tr>
            <Table.Td>{name}</Table.Td>
            <Table.Td>{age}</Table.Td>
            <Table.Td>
                <ActionIcon 
                    onClick={() => dispatch(deleteUser(index))} 
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
            <UserForm index={index} user={{name:name,age:age}} close={close} />
        </Modal>
        </>
    );
}

export {UserDetail}