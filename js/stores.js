const serviceDescription = {
  Grooming: "Grooming and spa services",
  Food: "Pet food from top brands",
  Activities: "Location specific activities",
  Medicines: "Emergency and healthcare medicinies"
}

const storesData = [
  {
    "id": 1,
    "name": "Olive Pet Store",
    "image": "./images/petStores/petStore1.png",
    "rating": 4,
    "address": "123 W Taylor St, Chicago IL, 60607",
    "status": "Open",
    "openingTime": "06:00",
    "closingTime": "21:00",
    "services": [
      "Grooming",
      "Food",
      "Activities"
    ],
    "petTypes": [
      "Dog",
      "Cat"
    ],
    "phone": "+1(123) 456-7890",
    "website": "www.olivepetstore.com",
    "favorite": false
  },
  {
    "id": 2,
    "name": "Petco",
    "image": "./images/petStores/petStore2.png",
    "rating": 5,
    "address": "710 S Lytle St, Chicago IL, 60607",
    "status": "Closed",
    "openingTime": "06:00",
    "closingTime": "21:00",
    "services": [
      "Food",
      "Medicines"
    ],
    "petTypes": [
      "Dog"
    ],
    "phone": "+1(312) 896-7090",
    "website": "www.petco.com",
    "favorite": true
  },
  {
    "id": 3,
    "name": "Fuji Adobe",
    "image": "./images/petStores/petStore3.png",
    "rating": 5,
    "address": "821 S Racine Ave, Chicago IL, 60607",
    "status": "Open",
    "openingTime": "06:00",
    "closingTime": "21:00",
    "services": [
      "Grooming",
      "Food"
    ],
    "petTypes": [
      "Dog"
    ],
    "phone": "+1(312) 896-7191",
    "website": "www.fujiadobe.com",
    "favorite": false
  },
  {
    "id": 4,
    "name": "Petland",
    "image": "./images/petStores/petStore4.png",
    "rating": 5,
    "address": "916 W Carpenter St, Chicago IL, 60607",
    "status": "Closed",
    "openingTime": "06:00",
    "closingTime": "21:00",
    "services": [
      "Grooming",
      "Activities"
    ],
    "petTypes": [
      "Dog",
      "Bird",
      "Fish"
    ],
    "phone": "+1(916) 796-0191",
    "website": "www.petland.com",
    "favorite": false
  },
  {
    "id": 5,
    "name": "Jameson Stores",
    "image": "./images/petStores/petStore5.png",
    "rating": 5,
    "address": "119 N Halsted St, Chicago IL, 60607",
    "status": "Closed",
    "openingTime": "06:00",
    "closingTime": "21:00",
    "services": [
      "Grooming",
      "Activities"
    ],
    "petTypes": [
      "Dog"
    ],
    "phone": "+1(123) 816-7811",
    "website": "www.jamesonstores.com",
    "favorite": true
  }
]

var requiredStores = storesData
$(document).ready(displayStores);


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
        $(option).css("margin-top", "6px");
        var checkBox = document.createElement("input");
        $(checkBox).attr("type", "checkbox");
        $(checkBox).attr("name", "option");
        $(checkBox).attr("value", categoryOption.value);
        $(checkBox).css("margin-right", "10px");
        $(checkBox).attr("id", 'store-filter-' + categoryOption.value);
        $(checkBox).attr("onClick", `onFilterOptionClick('${categoryOption.value}')`);
        $(checkBox).addClass("form-check-input")

        var label = document.createElement("label");
        $(label).attr("for", categoryOption.value);
        $(label).append(categoryOption.value);

        $(option).append(checkBox)
        $(option).append(label)
        $(section).append(option)
      })
      $('#filter-data').append(section)
      $('input[name="option"]').change(function () {
        if ($('input[name="option"]:checked').length > 0) {
          $("#filter-clear").removeClass("d-none");
        } else {
          $("#filter-clear").addClass("d-none");
        }
      });
    })
  });
});

function onClearAllClick() {
  $('input[name="option"]').each(function () {
    this.checked = false;
  });
  requiredStores = []
  displayStores()
  $("#filter-clear").addClass("d-none");
}

var selectedOptions = []

function onFilterOptionClick(option) {
  if ($(`#store-filter-${option}`).is(":checked")) {
    selectedOptions.push(option)
  } else {
    var index = selectedOptions.indexOf(option);
    if (index !== -1) {
      selectedOptions.splice(index, 1);
    }
  }
  requiredStores = []
  storesData.forEach((store) => {
    if (store.petTypes.some(r => selectedOptions.indexOf(r) >= 0) || store.services.some(r => selectedOptions.indexOf(r) >= 0) || (selectedOptions.indexOf('Favorites') >= 0 && store.favorite)) {
      requiredStores.push(store)
    }
  })
  displayStores()
}

function displayStores() {
  $("#stores-list").empty()
  if (!requiredStores.length) requiredStores = storesData
  requiredStores.forEach((store) => {
    var stars = ``;
    for (let i = 0; i < store.rating; i++) {
      stars += `<i class="bi bi-star-fill" style="color: #F1C644;"></i>&nbsp`;
    }
    var card = `
        <div class="col-lg-3 px-3 py-4" data-bs-toggle="modal" data-bs-target="#storesDetailModal" style="cursor:pointer" onClick=onStoreCardClick(${store.id})>
          <div class="card shadow-sm">
            <img
              src=${store.image}
              class="card-img-top"
              style="height:16rem"
            />
            <span class="position-absolute translate-middle badge rounded-pill bg-light" style="top:4%;left:90%;visibility:${store.favorite ? 'visible' : 'hidden'}">
              <i class="bi bi-heart-fill fs-5" style="color: red"></i>
            </span>
            <div class="card-body" style="height:14rem">
            <div class="row">
              <div class="col-lg-12">
                <h5 class="card-title">${store.name}</h5>
              </div>
            </div>
              <p class="card-text mb-2">${stars}</p>
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
}

function onStoreCardClick(id) {
  const data = storesData
  const storeId = id - 1
  var stars = ``;
  for (let i = 0; i < data[storeId].rating; i++) {
    stars += `<i class="bi bi-star-fill" style="color: #F1C644;"></i>&nbsp`;
  }
  $('#storeName').text(data[storeId].name)
  $('#storeStars').html(stars)
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
  favButtonText(storeId)
}

function favButtonText(id) {
  $('.favorite-button').attr("id", `favorite-button-${id + 1}`)
  if (storesData[id].favorite) {
    $('.favorite-button').html('<span class="d-flex align-items-center" style="color:red"><i class="bi bi-heart-fill fs-5 me-2"></i>Remove from favorites</span>')
  } else {
    $('.favorite-button').html('<span class="d-flex align-items-center"><i class="bi bi-heart fs-5 me-2"></i>Add to favorites</span>')
  }
}

function onFavoriteClick(id) {
  const storeId = id.split('-')[2] - 1
  storesData[storeId].favorite = !storesData[storeId].favorite
  favButtonText(storeId)
  displayStores()
}

function signInOut() {
  var signInButton = document.getElementById("sign-in");
  if (signInButton.innerText == "Sign in") {
    $("#sign-in").text('Log Out');
  } else if (signInButton.innerText == "Log Out") {
    $("#sign-in").text('Sign in');
  }
}

// Function to scroll to top
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// On scroll show the button
window.onscroll = function () {
  // Get the button to scroll to the top
  var topbutton = document.getElementById("return-to-top");
  // When the user scrolls down 20px from the top of the document, show the button
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topbutton.hidden = false;
  }
  // Otherwise, hide the button
  else {
    topbutton.hidden = true;
  }
};