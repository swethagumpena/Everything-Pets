const serviceDescription = {
  Grooming: "Grooming and spa services",
  Food: "Pet food from top brands",
  Activities: "Location specific activities",
  Medicines: "Emergency and healthcare medicinies"
}

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
    $.each(data, function (i, store) {
      var card = `
  <div class="col-lg-3 mb-4" data-bs-toggle="modal" data-bs-target="#storesDetailModal" style="cursor:pointer" onClick=onStoreCardClick(${store.id})>
    <div class="card shadow-sm">
      <img
        src=${store.image}
        class="card-img-top"
        style="height:16rem"
      />
      <div class="card-body" style="height:14rem">
        <h5 class="card-title">${store.name}</h5>
        <p class="card-text">
          <p class="store-address mb-2">
            <i class="bi bi-geo-alt me-2"></i>
            ${store.address}
          </p>
          <p class="store-status mb-2">
            <i class="bi bi-clock me-2"></i>
            ${store.status}  |   ${store.status === 'Open' ? `Closes at ${store.closingTime}` : `Opens at ${store.openingTime}`}
          </p>
          <p class="store-services mb-2">
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
      $("#stores-list").append(card)
    })
  })
})

function onStoreCardClick(id) {
  $.getJSON('data/stores.json', function ({ data }) {
    const storeId = id - 1
    $('#storeName').text(data[storeId].name)
    $('#storeAddress').text(data[storeId].address)
    $('#storeStatus').text(data[storeId].status)
    $('#storeServices').text('')
    data[storeId].services.map((service) => {
      $('#storeServices').append(`<li>${serviceDescription[service]}</li>`)
    })
    $('#storePets').text(data[storeId].petTypes.join(', '))
    $('#storePhone').text(data[storeId].phone)
    $('#storeSite').attr("href", data[storeId].website)
    $('#storeSite').text(data[storeId].website)
    $('#carouselImg1').attr("src", data[storeId].image)
    $('#carouselImg2').attr("src", data[storeId].image)
    $('#carouselImg3').attr("src", data[storeId].image)
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