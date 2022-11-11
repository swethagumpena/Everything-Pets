reminders = [
    {
        title: "Freya's Vet Visit",
        start: '2022-11-22T14:26',
        end: '2022-11-22T14:26',
        address: '1203 W Taylor St, Chicago, IL - 60607',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet rem illo totam enim veniam? Doloremque exercitationem tenetur, id eveniet distinctio hic voluptas sed provident quam.'
    }
]

const calendar = new Calendar({
    id: '#calendar',
    eventsData: reminders,
    dateChanged: (currentDate, filteredDateEvents) => {
        console.log(currentDate, filteredDateEvents);
        displayReminders(filteredDateEvents)
        $('#reminders-on-date').text('Reminders on ' + moment(currentDate).local(true).format('DD MMM, YYYY'))
    }
})

$('#reminders-on-date').text('Reminders on ' + moment(calendar.getSelectedDate()).local(true).format('DD MMM, YYYY'))

$('#add-reminder-button').on('click', e => {
    const title = $('#add-reminder-title')
    const address = $('#add-reminder-address')
    const start = $('#add-reminder-datetime')
    const description = $('#add-reminder-description')

    const reminder = {
        start: start.val(),
        end: start.val(),
        title: title.val().trim(),
        address: address.val().trim(),
        description: description.val().trim()
    }

    console.log(reminder);

    if (reminder.title == '' || reminder.address == '' || reminder.start == '' || reminder.description == '') {
        $('#form-error').text("Please fill in all the fields")
        return
    }
    else {
        $('#form-error').text("")
    }

    addReminder(reminder)

    title.val("")
    address.val("")
    start.val("")
    description.val("")

    var addReminderModal = bootstrap.Modal.getInstance($('#addReminderModal'))
    addReminderModal.hide();

})


// displayReminders(reminders)


function displayReminders(reminders) {
    reminders_html = ``

    if (reminders.length > 0) {
        reminders_html = ``

        reminders.forEach((reminder, i) => {

            const date = moment(reminder.start).format("DD MMM, YYYY")
            const time = moment(reminder.start).format("HH:MM");

            reminders_html += `
                <div id="${i}" class="reminder card shadow-sm mb-3" onClick="openReminder(${i})">
                    <div class="card-body">
                    <h4 class="card-title mb-3">
                        ${reminder.title}
                    </h4>
                    <p class="card-text mb-2">
                        <span class="reminder-date me-5">
                        <i class="bi bi-calendar-week me-2"></i>
                        ${date}
                        </span>
                        <span class="reminder-time">
                        <i class="bi bi-clock me-2"></i>
                        ${time}
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

    else {
        reminders_html = `<div
        class="align-items-center justify-content-center"
        style="display: flex; height: 100%;"
      >
        <p class="text-secondary text-center">
          <i>
            Please choose a date to view events on that day
            <br />
            or
            <br />
            Create a new event
            <br />
            <br />
            Hint: Events are marked by a dot below the date
          </i>
        </p>
      </div>`
    }

    $('#reminders').html(reminders_html)



}

function addReminder(reminder) {

    calendar.addEventsData([reminder]);
    calendar.setDate(reminder.start)
}

function openReminder(i) {
    const eventsThisMonth = calendar.filteredEventsThisMonth

    const reminders = eventsThisMonth.filter(event => {
        return moment(event.start).format('YYYY-MM-DD') == moment(calendar.getSelectedDate()).local(true).format('YYYY-MM-DD')
    });

    const reminder = reminders[i]

    const date = moment(reminder.start).format("DD MMM, YYYY")
    const time = moment(reminder.start).format("HH:MM");

    $('#reminder-details-title').text(reminder.title)
    $('#reminder-details-date').text(date)
    $('#reminder-details-time').text(time)
    $('#reminder-details-address').text(reminder.address)
    $('#reminder-details-description').text(reminder.description);

    var reminderDetailsModal = bootstrap.Modal.getOrCreateInstance($('#reminderDetailsModal'))
    reminderDetailsModal.show();
}
