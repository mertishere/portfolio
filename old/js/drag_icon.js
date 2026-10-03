const screen_container = document.querySelector(".screen_container")

apps.forEach(app => {
        // allow for dragging the tab around
        let is_clicked = false
        let is_dragging = false
        let offsetx, offsety

        const center_the_icon = (e) => {
            let column_width = (screen_container.getBoundingClientRect().width / 14)
            column_width = Math.floor(column_width)

            let row_height = (screen_container.getBoundingClientRect().height / 5 )
            row_height = Math.floor(row_height)

            var row = Math.floor(e.clientY / row_height) + 1
            row = row > 5 ? row - 1 : row

            var column = Math.floor(e.clientX / column_width) + 1
            column = column > 14 ? column - 1 : column


            const check_overlap = () => {
                const check_app = document.querySelector(`.apps[grid_section="${row}${column}"]`)
                
                if(check_app) {
                    if(check_app.id == app.id) return
                    if(row < 5) {
                        row += 1
                        check_overlap()
                        return
                    } else {
                        column += 1
                        check_overlap()
                        return
                    }
                }
                return
            }

            check_overlap()

            app.style.gridRow = `${row}`
            app.style.gridColumn = `${column}`
            app.setAttribute("grid_section", `${row}${column}`)

            app.style.position = "relative"
            app.style.marginLeft = "0"
            app.style.marginTop = "0"   
            app.style.zIndex = "1"
            is_dragging = false
            screen_container.removeAttribute("drag_in_progress")
        }

        app.addEventListener("mouseenter", (e) => {
            if(is_clicked && is_dragging) return;
            is_dragging = false;
            is_clicked = false;
            screen_container.removeAttribute("drag_in_progress")
        })

        app.addEventListener("mousedown", (e) => {
            e.preventDefault()
            if(screen_container.getAttribute("drag_in_progress")) return

            is_clicked = true
            screen_container.setAttribute("drag_in_progress", true)

            offsetx = e.clientX - app.getBoundingClientRect().left
            offsety = e.clientY - app.getBoundingClientRect().top

            app.style.marginLeft = `${e.clientX - offsetx}px`
            app.style.marginTop = `${e.clientY - offsety}px`
            app.style.position = "absolute"
            app.style.left = "0"
            app.style.top = "0"
            app.style.zIndex = "3"
        })

        app.addEventListener("mousemove", (e) => {
            let screen_width = screen_container.getBoundingClientRect().width
            let screen_height = screen_container.getBoundingClientRect().height
            if(
                (
                    screen_width < e.clientX
                    ||
                    30 > e.clientX
                )
                &&
                is_clicked
            ) {
                is_clicked = false
                center_the_icon(e)
                return
            }
            if(
                (
                    screen_height < e.clientY
                    ||
                    30 > e.clientY
                )
                &&
                is_clicked
            ) {
                is_clicked = false
                center_the_icon(e)
                return
            }

            if(is_clicked) {
                is_dragging = true
                app.style.marginLeft = `${e.clientX - offsetx}px`
                app.style.marginTop = `${e.clientY - offsety}px`
            }
        })
        app.addEventListener('mouseup', (e) => {
            if(is_clicked && !is_dragging) {
                is_clicked = false
                screen_container.removeAttribute("drag_in_progress", true)
                return
            }
            if(is_clicked && is_dragging) center_the_icon(e)
            is_clicked = false
            is_dragging = false
        })
        app.addEventListener("mouseleave", (e) => {
            if(is_clicked && is_dragging) {
                let screen_width = screen_container.getBoundingClientRect().width
                let screen_height = screen_container.getBoundingClientRect().height
                if(
                    (
                        screen_width < e.clientX
                        ||
                        30 > e.clientX
                    )
                    &&
                    is_clicked
                ) {
                    is_clicked = false
                    center_the_icon(e)
                    return
                }
                if(
                    (
                        screen_height < e.clientY
                        ||
                        30 > e.clientY
                    )
                    &&
                    is_clicked
                ) {
                    is_clicked = false
                    center_the_icon(e)
                    return
                }

                app.style.marginLeft = `${e.clientX - offsetx}px`
                app.style.marginTop = `${e.clientY - offsety}px`
                return
            }
            is_clicked = false
        })
})