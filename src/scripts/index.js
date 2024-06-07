import "regenerator-runtime" /* for async await transpile */
import "../styles/main.css"
import "lazysizes"
import "lazysizes/plugins/parent-fit/ls.parent-fit"
import App from "./views/app"
import swRegister from "./utils/sw-register"
import LazyLoad from "./utils/lazyload"

const app = new App({
    button: document.querySelector("#hamburgerButton"),
    drawer: document.querySelector("#navigationDrawer"),
    content: document.querySelector("#mainContent"),
})
window.addEventListener("hashchange", () => {
    app.renderPage()
})

window.addEventListener("load", () => {
    app.renderPage()
    swRegister()
    LazyLoad.init()
})
