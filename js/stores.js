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

$(function () {
  $.getJSON('data/stores.json', function ({ data }) {
    var card = ``
    $.each(data, function (i, store) {
      var card = `<div class="col-sm-3 card d-flex align-items-center">
      <img class="card-img-top" src=${store.image} alt="Card image cap">
      <div class="card-body align-self-start">
        <p style="font-size: 26px; font-weight: 700; margin-bottom: 0;">${store.name}</p>
        <div class="d-flex align-items-center">
            <i class="bi bi-geo-fill"></i>
            <p class="mx-3">${store.address}</p>
        </div>
        <div class="d-flex align-items-center my-2">
            <i class="bi bi-clock"></i>
            <p class="mx-3">${store.status}</p>
            <p class="mx-3">|</p>
            <p class="mx-3">${store.status === 'Open' ? `Closes at ${store.closingTime}` : `Opens at ${store.openingTime}`}</p>
        </div>
        <div class="d-flex align-items-center my-2">
            <p style="font-weight: 700;">Specialize in:&nbsp</p>
            <p>${store.services.join(', ')}</p>
        </div>
        <div class="d-flex align-items-center mt-2">
            <p style="font-weight: 700;">For:&nbsp</p>
            <p>${store.petTypes.join(', ')}</p>
        </div>
      </div>
    </div>`
      for (let i = 0; i < store.rating; i++) {
        // TODO: not working
        $(`#rating-${store.id}`).append("<i class='bi bi-star-fill'></i>")
      }
      $("#stores-list").append(card)
    })
  })
})

function onClick() {
  $.getJSON('data/stores.json', function ({ data }) {
    $.each(data, function (i, store) {
      var modal = ` 
     <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">${store.name}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
  `
    })
  })
}

function signInOut() {
  var signInButton = document.getElementById("sign-in");
  if (signInButton.innerText == "Sign in") {
    $("#sign-in").text('Log Out');
  } else if (signInButton.innerText == "Log Out") {
    $("#sign-in").text('Sign in');
  }
}