$(document).ready(function () {
    const calendar = new Calendar({
        id: '#calendar',
    })

    const reminders = [
        {
            title: "Freya's Vet Visit",
            date: '21 Oct 2022',
            time: '14:00',
            address: '1203 W Taylor St, Chicago, IL - 60607',
        },
        {
            title: "Freya's Vet Visit",
            date: '21 Oct 2022',
            time: '14:00',
            address: '1203 W Taylor St, Chicago, IL - 60607',
        },
        {
            title: "Freya's Vet Visit",
            date: '21 Oct 2022',
            time: '14:00',
            address: '1203 W Taylor St, Chicago, IL - 60607',
        },
        {
            title: "Freya's Vet Visit",
            date: '21 Oct 2022',
            time: '14:00',
            address: '1203 W Taylor St, Chicago, IL - 60607',
        },
    ]

    displayReminders(reminders)
})

function displayReminders(reminders) {
    reminders_html = ``

    reminders.forEach((reminder) => {
        reminders_html += `<div class="reminder card shadow-sm mb-3">
                <div class="card-body">
                <h4 class="card-title mb-3">
                    ${reminder.title}
                </h4>
                <p class="card-text mb-2">
                    <span class="reminder-date me-5">
                    <i class="bi bi-calendar-week me-2"></i>
                    ${reminder.date}
                    </span>
                    <span class="reminder-time">
                    <i class="bi bi-clock me-2"></i>
                    ${reminder.time}
                    </span>
                </p>
                <p>
                    <span class="reminder-location">
                    <i class="bi bi-geo-alt me-2"></i>
                    ${reminder.address}
                    </span>
                </p>
                </div>
            </div>`
    })
    $('#reminders').html(reminders_html)
}
