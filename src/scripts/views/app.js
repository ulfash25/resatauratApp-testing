import DrawerInitiator from "../utils/drawer-initiator"
import UrlParser from "../routes/url-parser"
import routes from "../routes/routes"

class App {
    constructor({ button, drawer, content }) {
        this._button = button
        this._drawer = drawer
        this._content = content

        this._initialAppShell()
    }

    _initialAppShell() {
        DrawerInitiator.init({
            button: this._button,
            drawer: this._drawer,
            content: this._content,
        })

    // kita bisa menginisiasikan komponen lain bila ada
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner()
        const page = routes[url]
        this._content.innerHTML = await page.render()
        await page.afterRender()

        const skipLinkElem = document.querySelector(".skip-link")
        skipLinkElem.addEventListener("click", (event) => {
            event.preventDefault()
            document.querySelector("#mainContent").focus()
        })

        const loadDetailElem = document.getElementById("loadDetail")
        if (loadDetailElem) {
            loadDetailElem.addEventListener("click", async () => {
                const module = await import("./pages/detail")
                module.loadRestaurantDetail()
            })
        }
    }
}

export default App
