const wait = (miliseconds) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            resolve()
            clearTimeout(timeout)
        }, miliseconds)
    })
}

const starting_screen = document.querySelector(".starting_screen")
const starting_screen_data = document.querySelector(".starting_screen_data")

const starting_launch_info = document.querySelector(".starting_launch_info")
const starting_title_wrapper = document.querySelector(".starting_title_wrapper")
const starting_computer_data = document.querySelector(".starting_computer_data")
const starting_control_panel = document.querySelector(".starting_control_panel")
const starting_detections = document.querySelector(".starting_detections")
const starting_logo = document.querySelector(".starting_logo")
const starting_loading_text = document.querySelector(".starting_loading_text")

const introduction_screen = document.querySelector(".introduction_screen")

const build = async ()  => {
    await wait(1000)
    starting_screen.style.display = "flex"

    starting_screen_data.style.opacity = "1"
    starting_launch_info.style.opacity = "1"
    
    await wait(1500)
    starting_logo.style.opacity = "1"
    await wait(300)
    starting_loading_text.style.opacity = "1"
    await wait(500)
    starting_title_wrapper.style.opacity = "1"
    await wait(500)
    starting_title_wrapper.querySelector("img").style.opacity = "1"
    await wait(120)
    starting_computer_data.style.opacity = "1"
    await wait(200)
    starting_control_panel.style.opacity = "1"
    await wait(400)
    starting_detections.style.opacity = "1"
    starting_detections.children[0].style.opacity = "1"
    await wait(2500)
    starting_detections.children[1].style.opacity = "1"
    await wait(1000)
    
    starting_screen.style.display = "none"
    await wait(1500)
    
    const starting_screen_final = document.querySelector(".starting_screen_final")
    const pci_info = document.querySelector(".pci_info")
    const init_info = document.querySelector(".init_info")
    const open_info = document.querySelector(".open_info")
    pci_info.style.opacity = "0"
    starting_screen_final.style.display = "flex"

    await wait(2300)
    pci_info.style.opacity = "1"
    await wait(500)
    init_info.style.opacity = "1"
    await wait(300)
    open_info.style.opacity = "1"
    await wait(2300)
    starting_screen_final.style.display = "none"
    introduction_screen.style.display = "flex"
    await wait(1000)
    introduction_screen.style.opacity = "1"
    await wait(3000)
    window.location.href = "../blog/index.html"
}

build()