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
      var card = `<div class="col-lg-3 mb-5">
    <div class="card shadow-sm">
      <img
        src=${store.image}
        class="card-img-top"
      />
      <div class="card-body">
        <h5 class="card-title">${store.name}</h5>
        <p class="card-text">
          <p class="store-address mb-2">
            <i class="bi bi-geo-alt me-2"></i>
            ${store.address}
          </p>
        <p class="store-status  mb-2">
            <i class="bi bi-clock me-2"></i>
            ${store.status}  |   ${store.status === 'Open' ? `Closes at ${store.closingTime}` : `Opens at ${store.openingTime}`}
          </p>
        <p class="store-services  mb-2">
            <span style="font-weight: 700;">Services:&nbsp</span>
            ${store.services.join(', ')}
        </p>
           <div class="d-flex align-items-center mt-2">
           <span style="font-weight: 700;">For:&nbsp</span>
               <p>${store.petTypes.join(', ')}</p>
           </div>
        </p>
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