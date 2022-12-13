const boardingsData = [
  {
    "id": 1,
    "name": "Marcus Boarding",
    "image": "./images/petBoarding/boarding1.jpeg",
    "rating": 4,
    "address": "123 W Taylor St, Chicago IL, 60607",
    "status": "Open",
    "openingTime": "06:00",
    "closingTime": "21:00",
    "petTypes": [
      "Dog",
      "Cat"
    ],
    "phone": "+1(123) 456-7890",
    "website": "www.marcusboarding.com",
    "locationOfService": "In-home",
    "favorite": false,
    "notes": ""
  },
  {
    "id": 2,
    "name": "Petco",
    "image": "./images/petBoarding/boarding2.jpeg",
    "rating": 5,
    "address": "710 S Lytle St, Chicago IL, 60607",
    "status": "Closed",
    "openingTime": "06:00",
    "closingTime": "21:00",
    "petTypes": [
      "Dog"
    ],
    "phone": "+1(312) 896-7090",
    "website": "www.petco.com",
    "locationOfService": "Outdoors",
    "favorite": false,
    "notes": ""
  },
  {
    "id": 3,
    "name": "Gala Boarding",
    "image": "./images/petBoarding/boarding3.jpeg",
    "rating": 5,
    "address": "821 S Racine Ave, Chicago IL, 60607",
    "status": "Open",
    "openingTime": "06:00",
    "closingTime": "21:00",
    "petTypes": [
      "Dog"
    ],
    "phone": "+1(312) 896-7191",
    "website": "www.galaboarding.com",
    "locationOfService": "In-home",
    "favorite": true,
    "notes": ""
  },
  {
    "id": 4,
    "name": "Olive Adobe",
    "image": "./images/petBoarding/boarding4.jpeg",
    "rating": 5,
    "address": "916 W Carpenter St, Chicago IL, 60607",
    "status": "Closed",
    "openingTime": "06:00",
    "closingTime": "21:00",
    "petTypes": [
      "Dog",
      "Bird",
      "Fish"
    ],
    "phone": "+1(916) 796-0191",
    "website": "www.oliveadobe.com",
    "locationOfService": "In-home",
    "favorite": false,
    "notes": ""
  },
  {
    "id": 5,
    "name": "Jonathon Homes",
    "image": "./images/petBoarding/boarding5.jpeg",
    "rating": 5,
    "address": "119 N Halsted St, Chicago IL, 60607",
    "status": "Closed",
    "openingTime": "06:00",
    "closingTime": "21:00",
    "petTypes": [
      "Dog"
    ],
    "phone": "+1(123) 816-7811",
    "website": "www.jonathonhomes.com",
    "locationOfService": "Outdoors",
    "favorite": true,
    "notes": ""
  }
]

var requiredBoardings = boardingsData
$(document).ready(displayBoardings);

$(function () {
  $.getJSON('data/boardingFilters.json', function ({ data }) {
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
        $(checkBox).attr("id", 'boarding-filter-' + categoryOption.value);
        $(checkBox).attr("onClick", `onBoardingFilterOptionClick('${categoryOption.value}')`);
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
  requiredBoardings = []
  displayBoardings()
  $("#filter-clear").addClass("d-none");
}

var selectedBoardingOptions = []

function onBoardingFilterOptionClick(option) {
  if ($(`#boarding-filter-${option}`).is(':checked')) {
    selectedBoardingOptions.push(option)
  } else {
    var index = selectedBoardingOptions.indexOf(option);
    if (index !== -1) {
      selectedBoardingOptions.splice(index, 1);
    }
  }
  requiredBoardings = []
  boardingsData.forEach((boarding) => {
    if (boarding.petTypes.some(r => selectedBoardingOptions.indexOf(r) >= 0) || selectedBoardingOptions.indexOf(boarding.locationOfService) >= 0 || (selectedBoardingOptions.indexOf('Favorites') >= 0 && boarding.favorite)) {
      requiredBoardings.push(boarding)
    }
  })
  displayBoardings()
}

function displayBoardings() {
  $("#boardings-list").empty()
  if (!requiredBoardings.length) requiredBoardings = boardingsData
  requiredBoardings.forEach((boarding) => {
    var stars = ``;
    for (let i = 0; i < boarding.rating; i++) {
      stars += `<i class="bi bi-star-fill" style="color: #F1C644;"></i>&nbsp`;
    }
    var card = `
        <div class="col-lg-3 px-3 py-4" data-bs-toggle="modal" data-bs-target="#boardingDetailModal" style="cursor:pointer" onClick=onBoardingCardClick(${boarding.id})>
          <div class="card shadow-sm">
            <img
              src=${boarding.image}
              class="card-img-top"
              style="height:16rem"
            />
            <span class="position-absolute translate-middle badge rounded-pill bg-danger py-2" style="top:4%;left:80%;visibility:${boarding.favorite ? 'visible' : 'hidden'}">
              <i class="bi bi-heart-fill me-1" style="font-size: 0.75rem"></i>
              Favorited
            </span>
            <div class="card-body" style="height:14rem">
            <div class="row">
              <div class="col-lg-12">
              <h5 class="card-title">${boarding.name}</h5>
              </div>
            </div>
              <p class="card-text mb-2">${stars}</p>
              <p class="card-text">
                <p class="boarding-address mb-2">
                  <i class="bi bi-geo-alt me-2"></i>
                  ${boarding.address}
                </p>
                <p class="boarding-status mb-2">
                  <i class="bi bi-clock me-2"></i>
                  ${boarding.status}  |   ${boarding.status === 'Open' ? `Closes at ${boarding.closingTime}` : `Opens at ${boarding.openingTime}`}
                </p>
                <p class="boarding-location-of-services mb-2">
                <span style="font-weight: 700;">Service:&nbsp</span>
                ${boarding.locationOfService}
              </p>
                <div class="d-flex align-items-center mt-2">
                  <span style="font-weight: 700;">For:&nbsp</span>
                     <p>${boarding.petTypes.join(', ')}</p>
                </div>
              </p>
            </div>
          </div>
        </div>`
    $("#boardings-list").append(card)
  })
}

function onBoardingCardClick(id) {
  const data = boardingsData
  const boardingId = id - 1
  var stars = ``;
  for (let i = 0; i < data[boardingId].rating; i++) {
    stars += `<i class="bi bi-star-fill" style="color: #F1C644;"></i>&nbsp`;
  }
  $('#boardingName').text(data[boardingId].name)
  $('#boardingStars').html(stars)
  $('#boardingAddress').text(data[boardingId].address)
  $('#boardingStatus').text(data[boardingId].status)
  $('#boardingPets').text(data[boardingId].petTypes.join(', '))
  $('#boardingLocationOfService').text(data[boardingId].locationOfService)
  $('#boardingPhone').text(data[boardingId].phone)
  $('#boardingSite').attr("href", data[boardingId].website)
  $('#boardingSite').text(data[boardingId].website)
  $('#carouselImg1').attr("src", data[boardingId].image)
  $('#carouselImg2').attr("src", data[boardingId].image)
  $('#carouselImg3').attr("src", data[boardingId].image)
  $('#my-notes').val(data[boardingId].notes)
  favButtonText(boardingId)
}

function editNote() {
  $('#my-notes').attr("disabled", false)
  $('#my-notes').focus()
  $('#edit-notes-button').hide()
  $('#save-notes-button').show()

}

function saveNote() {
  $('#my-notes').attr("disabled", true)
  $('#save-notes-button').hide()
  $('#edit-notes-button').show()
}

function favButtonText(id) {
  $('.favorite-button').attr("id", `favorite-button-${id + 1}`)
  if (boardingsData[id].favorite) {
    $('.favorite-button').html('<span class="d-flex align-items-center" style="color:red"><i class="bi bi-heart-fill fs-5 me-2"></i>Remove from favorites</span>')
  } else {
    $('.favorite-button').html('<span class="d-flex align-items-center"><i class="bi bi-heart fs-5 me-2"></i>Add to favorites</span>')
  }
}

function onFavoriteClick(id) {
  const boardingId = id.split('-')[2] - 1
  boardingsData[boardingId].favorite = !boardingsData[boardingId].favorite
  favButtonText(boardingId)
  displayBoardings()
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