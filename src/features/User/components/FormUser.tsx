import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

import { userValidationSchema } from "../valisation";
import { UserDto, UserForCreationDto, UserForUpdateDto } from '../type';
import { useAddUser } from '../api/addUser';
import { Notifications } from '../../../components/notifications/Notifications';
import { useUpdateUser } from '../api/updateUser';
import { Button, Grid, Input } from '@mantine/core';

interface FormUserProps{
    userData?: UserDto;
    close: Function;
}

export const FormUser = ({userData,close}:FormUserProps) => {

    const [user,setUser] = useState({
        name: userData?.name??"",
        age: userData?.age?? 0,
    } as UserForCreationDto | UserForUpdateDto);
        
    
      // handle default change request for update
    useEffect(()=>{
        if(userData && userData?.id) setUser(userData as UserForCreationDto | UserForUpdateDto);
    },[userData]);

    const onSubmit = (data: UserForCreationDto | UserForUpdateDto,formikHelpers: FormikHelpers<UserForCreationDto | UserForUpdateDto>) => { 
        userData && userData?.id ? updateUser(data,formikHelpers) : createUser(data,formikHelpers) ;  
    };
    

    const createUserApi = useAddUser();

    function createUser(data: UserForCreationDto,formikHelpers: FormikHelpers<UserForCreationDto | UserForUpdateDto>) {
        createUserApi
        .mutateAsync(data)
        .then((response) => {
            formikHelpers.setSubmitting(false);
            Notifications.success("User created successfully");
            //close();
        })
        .catch((e) => {
            formikHelpers.setSubmitting(false);
            Notifications.error("There was an error  when creating the User");
            console.error(e);
        })
        .finally(() => {

        });
    }
        
    const updateUserApi = useUpdateUser();
    function updateUser(data: UserForUpdateDto,formikHelpers: FormikHelpers<UserForCreationDto | UserForUpdateDto>) {
        const id = userData?.id;
        if (id === null || id === undefined) return;
    
        updateUserApi
          .mutateAsync({ id, data })
          .then(() => {
            formikHelpers.setSubmitting(false);
            Notifications.success("User updated successfully");
            close();
          })
          .then(() => {
            
          })
          .catch((e) => {
            formikHelpers.setSubmitting(false);
            Notifications.error("There was an error updating the User");
            console.error(e);
          });
    }
      
    return (
        <div>
            <h1>Add User</h1>
            <Formik
                initialValues={user}
                validationSchema={userValidationSchema}
                onSubmit={(values,formikHelpers) => {
                    console.log(values);
                    // same shape as initial values
                    
                    onSubmit(values as UserForCreationDto | UserForUpdateDto ,formikHelpers);
                    
                }}
            >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <Grid>
                        <Grid.Col>
                            <label>Name</label>
                            <Field name="name"  label="Name"/>
                        </Grid.Col>
                        <Grid.Col>
                            <ErrorMessage name="name"/>
                        </Grid.Col>

                        <Grid.Col>
                            <label>Age</label>
                            <Field name="age"  label="Age" />
                        </Grid.Col>

                        <Grid.Col>
                            <ErrorMessage name="age" />
                        </Grid.Col>
                        <Grid.Col>
                            <Button 
                                disabled={isSubmitting} 
                                loading={isSubmitting} 
                                type="submit"
                            >
                                {userData?.id ? "Modifier": "Ajouter"}
                            </Button>
                        </Grid.Col>                        
                
                    </Grid>
                
                </Form>
            )}
            </Formik>
        </div>
    );
};