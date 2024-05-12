import { UserList } from "./features/User/UserList";
import { Counter } from "./features/counter/Counter";

interface RouteType {
    path: string;
    action: string;
    entity: string;
    element: any;
};

// const routes = new Array<RouteType>();
const routes:Array<RouteType> = [
    { path: "/counter", action: "list", entity: "Fruit", element: Counter},
    { path: "/user", action: "add", entity: "Fruit", element: UserList},
    { path: "/other", action: "read", entity: "User", element: Counter}
];

export default routes;