export interface User{
    name:string;
    age?:number;
}

export interface UserDto{
    name:string;
    age?:number;
    id:string;
}

export interface UserForCreationDto{
    name:string;
    age?:number;
}

export interface UserForUpdateDto{
    name:string;
    age?:number;
}