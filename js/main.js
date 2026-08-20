const get_notes_lines = async (file) => {
    let html_for_file_lines = ""

    await fetch(file)
        .then((res) => res.text())
        .then((t) => {
            let lines = t.split("\r\n")
            lines.forEach(line => {
                html_for_file_lines += line
                html_for_file_lines += "<br>"
            })
        })
        
    return html_for_file_lines
}

const apps = document.querySelectorAll(".apps")
apps.forEach(app => {
    app.addEventListener("dblclick", async (e) => {
        const app_name = app.querySelector("p").textContent

        // check if tab already exists
        // if it does, focus it.
        const check_tab_exists = document.querySelector(`.tabs[app_name="${app_name}"]`)
        if(check_tab_exists) {
            document.querySelector(".tabs[focused]")?.removeAttribute("focused")

            // focus tab
            check_tab_exists.setAttribute("focused", true)
            return
        }


        // create_new_tab
        const new_tab = document.createElement("div")
        new_tab.className = "tabs"
        new_tab.setAttribute("app_name", app_name)

        // randomize tab position
        const off_set = Math.floor(Math.random() * 100);

        let screen_width = screen_container.getBoundingClientRect().width
        if(screen_width > 700) {
            let offset_x = off_set * 5
            let offset_y = off_set * 2
            new_tab.style.marginLeft = `${50 + offset_x}px`
            new_tab.style.marginTop = `${30 + offset_y}px`
        }
        

        // allow for dragging the tab around
        let is_dragging = false
        let offsetx, offsety;
        const on_start = (e) => {
            e.preventDefault()
            document.querySelector(".tabs[focused]")?.removeAttribute("focused")
            new_tab.setAttribute("focused", true)

            is_dragging = true

            const event = e.touches ? e.touches[0] : e
            offsetx = event.clientX - new_tab.getBoundingClientRect().left
            offsety = event.clientY - new_tab.getBoundingClientRect().top
        }

        const on_move = (e) => {
            if (is_dragging) {
                const event = e.touches ? e.touches[0] : e
                new_tab.style.marginLeft = `${event.clientX - offsetx}px`
                new_tab.style.marginTop = `${event.clientY - offsety}px`
            }
        }

        const on_end = () => {
            is_dragging = false
        }

        new_tab.addEventListener("mousedown", on_start)
        new_tab.addEventListener("mousemove", on_move)
        new_tab.addEventListener("mouseup", on_end)
        new_tab.addEventListener("mouseleave", on_end)
      



        const tab_name = document.createElement("p")
        tab_name.textContent = app_name

        const close_tabs = document.createElement("p")
        close_tabs.className = "close_tabs"
        close_tabs.textContent = "X"
        close_tabs.addEventListener("click", e => new_tab.remove())
        close_tabs.addEventListener("touchstart", e => new_tab.remove())

        const top_tab_row = document.createElement("div")
        top_tab_row.className = "top_tab_row"

        top_tab_row.appendChild(tab_name)
        top_tab_row.appendChild(close_tabs)
        new_tab.appendChild(top_tab_row)
        
        const text_wrapper = document.createElement("div")
        text_wrapper.className = "text_wrapper"
        
        const tab_text = document.createElement("p")
        tab_text.style.margin = "1rem"

        // get the notes for the app name
        const get_notes = await get_notes_lines(`../assets/notes/${app_name}.txt`)
        tab_text.innerHTML = get_notes.replaceAll("\n", "<br>")

        // if the notes were not empty,
        // add them.
        if(get_notes != "<br>") text_wrapper.appendChild(tab_text)

        if(app_name == "projects") {
            // add the projects to the tab_text
            // myFonttyper
            tab_text.innerHTML += `<a href="https://myfonttyper.com">
                <img src="../assets/myfonttyper.png" /> myFonttyper (a website for students)
                </a><br>`
            tab_text.innerHTML += `<a href="https://cherries.works">
            <img src="../assets/cherries.png" /> cherries.works (a website for low-level)
                </a><br>`
            tab_text.innerHTML += `<a href="https://zep.run">
            <img src="../assets/zep.png" /> zeP (a package manager for Zig)
                </a><br>`
        } else if(app_name == "trash") {
            // javascript trash section
            const js_wrapper = document.createElement("section")

            const js_text = document.createElement("p")
            js_text.textContent = "JavaScript"

            const js_img = document.createElement("img")
            js_img.src = "assets/javascript.png"

            const js_img_shadow = document.createElement("img")
            js_img_shadow.src = "assets/javascript.png"
            js_img_shadow.className = "image_shadow" 

            js_wrapper.appendChild(js_img)
            js_wrapper.appendChild(js_img_shadow)
            js_wrapper.appendChild(js_text)
            text_wrapper.appendChild(js_wrapper)


            
            // python trash section
            const py_wrapper = document.createElement("section")
            
            const py_text = document.createElement("p")
            py_text.textContent = "Python"
            
            const py_img = document.createElement("img")
            py_img.src = "assets/python.png"


            const py_img_shadow = document.createElement("img")
            py_img_shadow.src = "assets/python.png"
            py_img_shadow.className = "image_shadow" 

            py_wrapper.appendChild(py_img)
            py_wrapper.appendChild(py_img_shadow)
            py_wrapper.appendChild(py_text)
            text_wrapper.appendChild(py_wrapper)

        } else if(app_name == "blog") {
            const switch_site = document.createElement("section")

            const blog_site = document.createElement("a")
            blog_site.textContent = "boot up blog"
            blog_site.href = "blog/boot.html"

            switch_site.appendChild(blog_site)
            text_wrapper.appendChild(switch_site)
        }


        // focus on the newly created tab
        document.querySelector(".tabs[focused]")?.removeAttribute("focused")
        new_tab.setAttribute("focused", true)

        new_tab.appendChild(text_wrapper)
        document.body.appendChild(new_tab)
    })
})