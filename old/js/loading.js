const loading_text = document.querySelector(".loading_text")
const loading_screen = document.querySelector(".loading_screen")
const initialize_loading_screen = async() => {
    for(let i = 0; i < 8; i++) {
        let dots = ""
        if(i % 3 == 0) { dots = "." }
        if(i % 3 == 1) { dots = ".." }
        if(i % 3 == 2) { dots = "..." }
        loading_text.textContent = `Loading${dots}`
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 500)
        })
    }

    loading_screen.remove()
}
initialize_loading_screen()