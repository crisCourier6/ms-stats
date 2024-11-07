import { MainController } from "./controller/MainController"

export const Routes = [
// stat
{
    method: "get",
    route: "/api/v1/stats",
    controller: MainController,
    action: "statsAll"
}, {
    method: "get",
    route: "/api/v1/stats/:id",
    controller: MainController,
    action: "statsOne"
}, {
    method: "post",
    route: "/api/v1/stats",
    controller: MainController,
    action: "statsSave"
}, {
    method: "patch",
    route: "/api/v1/stats/:id",
    controller: MainController,
    action: "statsUpdate"
}, {
    method: "delete",
    route: "/api/v1/stats/:id",
    controller: MainController,
    action: "statsRemove"
}, 
//user has stat
{
    method: "get",
    route: "/api/v1/users-stats",
    controller: MainController,
    action: "userHasStatAll"
},{
    method: "get",
    route: "/api/v1/users-stats/:id",
    controller: MainController,
    action: "userHasStatOne"
},{
    method: "post",
    route: "/api/v1/users-stats",
    controller: MainController,
    action: "userHasStatCreate"
},{
    method: "patch",
    route: "/api/v1/users-stats/:id",
    controller: MainController,
    action: "userHasStatUpdate"
},{
    method: "delete",
    route: "/api/v1/users-stats/:id",
    controller: MainController,
    action: "userHasStatRemoveById"
},]