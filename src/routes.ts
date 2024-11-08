import { MainController } from "./controller/MainController"

export const Routes = [
// stat
{
    method: "get",
    route: "/stats",
    controller: MainController,
    action: "statsAll"
}, {
    method: "get",
    route: "/stats/:id",
    controller: MainController,
    action: "statsOne"
}, {
    method: "post",
    route: "/stats",
    controller: MainController,
    action: "statsSave"
}, {
    method: "patch",
    route: "/stats/:id",
    controller: MainController,
    action: "statsUpdate"
}, {
    method: "delete",
    route: "/stats/:id",
    controller: MainController,
    action: "statsRemove"
}, 
//user has stat
{
    method: "get",
    route: "/users-stats",
    controller: MainController,
    action: "userHasStatAll"
},{
    method: "get",
    route: "/users-stats/:id",
    controller: MainController,
    action: "userHasStatOne"
},{
    method: "post",
    route: "/users-stats",
    controller: MainController,
    action: "userHasStatCreate"
},{
    method: "patch",
    route: "/users-stats/:id",
    controller: MainController,
    action: "userHasStatUpdate"
},{
    method: "delete",
    route: "/users-stats/:id",
    controller: MainController,
    action: "userHasStatRemoveById"
},]