const wait = (miliseconds) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            resolve()
            clearTimeout(timeout)
        }, miliseconds)
    })
}


const xplore_button = document.querySelector(".xplore_button")
const introduction_screen = document.querySelector(".introduction_screen")
const main_section = document.querySelector(".main_section")
introduction_screen.style.opacity = "1"
introduction_screen.style.display = "flex"

let get_local = localStorage.getItem("in_blog", true)
if(get_local) {
    xplore_button.remove()
    introduction_screen.style.opacity = "0"
    introduction_screen.remove()
    main_section.style.display = "block"
    document.querySelector("body").style.overflow = "scroll"
}

xplore_button.addEventListener("click", async (e) => {
    await wait(500)
    xplore_button.remove()
    await wait(1500)
    introduction_screen.style.opacity = "0"
    await wait(300)
    introduction_screen.remove()
    main_section.style.display = "block"
    document.querySelector("body").style.overflow = "scroll"

    localStorage.setItem("in_blog", true)
})