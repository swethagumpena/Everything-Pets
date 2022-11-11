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
    "website": "www.marcusboarding.com"
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
    "website": "www.petco.com"
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
    "website": "www.galaboarding.com"
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
    "website": "www.oliveadobe.com"
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
    "website": "www.jonathonhomes.com"
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
        var checkBox = document.createElement("input");
        $(checkBox).attr("type", "checkbox");
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
    })
  });
});

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
    if (boarding.petTypes.some(r => selectedBoardingOptions.indexOf(r) >= 0)) {
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
            <div class="card-body" style="height:12rem">
            <div class="row">
              <div class="col-lg-10">
              <h5 class="card-title">${boarding.name}</h5>
              </div>
              <div class="col-lg-2">
                <i class="bi bi-heart fs-5"></i>
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
  $.getJSON('data/boardings.json', function ({ data }) {
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
    $('#boardingPhone').text(data[boardingId].phone)
    $('#boardingSite').attr("href", data[boardingId].website)
    $('#boardingSite').text(data[boardingId].website)
    $('#carouselImg1').attr("src", data[boardingId].image)
    $('#carouselImg2').attr("src", data[boardingId].image)
    $('#carouselImg3').attr("src", data[boardingId].image)
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