import { Button, Grid, Input } from "@mantine/core";
import { User } from "./type";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "./UserSlice";

interface UserFormProps{
    index?: number;
    user?: User;
    close: Function;
}

export const UserForm = ({index,user,close}:UserFormProps) => {
    const [name,setName] = useState("");
    const [age,setAge] = useState<number>();
    const dispatch = useDispatch();

    useEffect(()=>{
        setName(user?.name??"");
        if(user) setAge(user.age);
    },[user]);

    return (
        <Grid>
            <Grid.Col><Input size="xs" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} /></Grid.Col>
            <Grid.Col><Input size="xs" placeholder="Age" type="number" value={age} onChange={(e)=>setAge(parseInt(e.target.value))}/></Grid.Col>
            <Grid.Col>
                <Button 
                    variant="filled"
                    disabled={name.length < 3}
                    onClick={() => {
                        if(index === undefined){
                            dispatch(addUser({name:name,age:age}));
                        }else{
                            dispatch(updateUser({index:index??0 ,user:{name:name,age:age}}));
                        }
                        close();
                    }}
                >{index ? "Modifier":"Ajouter"}</Button>
            </Grid.Col>

            
        </Grid>
    );
}