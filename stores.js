$(function () {
    $.getJSON('data/storeFilters.json', function ({ data }) {
        $.each(data, function (i, category) {
            var section = document.createElement("div");
            var title = document.createElement("h6");
            $(title).addClass("filter-title-" + i);
            $(title).append(category.title);
            $(title).css({ "margin-top": "20px", "font-weight": 700 });
            $(section).append(title)

            $.each(category.data, function (i, categoryOption) {
                var option = document.createElement("div");
                var checkBox = document.createElement("input");
                $(checkBox).attr("type", "checkbox");
                $(checkBox).attr("value", categoryOption.value);
                $(checkBox).css("margin-right", "10px");

                var label = document.createElement("label");
                $(label).attr("for", categoryOption.value);
                $(label).append(categoryOption.value);

                $(option).append(checkBox)
                $(option).append(label)
                $(section).append(option)
            })
            $('#filter-data').append(section)
        })
    });
});

function signInOut() {
    var signInButton = document.getElementById("sign-in");
    if (signInButton.innerText== "Sign in") {
        $("#sign-in").text('Log Out');
    } else if (signInButton.innerText == "Log Out") {
        $("#sign-in").text('Sign in');
    }
   
}