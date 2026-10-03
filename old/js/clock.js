const clock_time = document.querySelector(".clock_time")

setInterval(() => {
    let now = new Date();

    let options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    let formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
    clock_time.textContent = formattedTime
}, 1000)