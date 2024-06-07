import Like from "../views/pages/like"
import Home from "../views/pages/home"
import Detail from "../views/pages/detail"

const routes = {
    "/": Home, // default page
    "/home": Home,
    "/like": Like,
    "/detail/:id": Detail,
}

export default routes
