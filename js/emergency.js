$(function () {
    $.getJSON('data/hosp.json', function ({ data }) {
        var card = ``;
        var ind = 0;
        $.each(data, function (i, hosp) {
            var stars = ``;
            if (ind == 0) {
                // Add a header for the nearest hospital
                $("#hosp-list").append(`<h3 class="p-3">Nearest Hospital</h3>`);
            }
            if (ind == 1) {
                // Add a header for the other hospitals
                $("#hosp-list").append(`<h3 class="p-3">Other Nearest Hospitals</h3>`);
            }
            for (let i = 0; i < hosp.rating; i++) {
                // Append a star with color yellow and font size 2em
                stars += `<i class="bi bi-star-fill" style="color: #F1C644; font-size: 1.2rem;"></i>&nbsp`;
            }
            // Create new html element for each hospital
            var card = document.createElement("div");
            card.className = "card shadow-sm w-100 p-3 mb-4";
            card.style = "background-color: rgba(255, 175, 175, 0.0);";
            var inner = 
            `
            <div class="card-body p-1">
                <div class="card-text container">
                    <div class="row">
                        <div class="col-md-9 no-float">
                            <h3 class="card-title">${hosp.name}</h3>
                            <div class="store-address mb-2">
                                <i class="bi bi-geo-alt me-2"></i>
                                ${hosp.address} &nbsp &nbsp | &nbsp &nbsp ${hosp.distance} mi
                            </div>
                            <div class="store-status  mb-2">
                                <i class="bi bi-clock me-2"></i>
                                <span class="${hosp.status === 'Open' ? 'text-success' : 'text-danger'}">${hosp.status}</span>  |   ${hosp.status === 'Open' ? `Closes at ${hosp.closingTime}` : `Opens at ${hosp.openingTime}`}
                            </div>
                        </div>
                        <div class="col-md-3 no-float align-self-center" style="text-align: center;">
                            ${stars}
                        </div>
                    </div>
                </div>
            </div>
            `;
            // Add the inner html to the card
            card.innerHTML = inner;
            // Set the onclick function to the card
            card.onclick = function () {
                // Change the background color of the card to indicate that it is selected
                $(card).css("background-color", "rgba(255, 175, 175, 0.2)");
                // Remove the highlight from the other cards
                $(card).siblings().css("background-color", "rgba(255, 175, 175, 0.0)");
                // Put the information of the selected hospital into the right panel
                
                // Create new image element for the hospital
                var img = document.createElement("img");
                img.className = "card-img-top";
                img.src = `${hosp.image}`;
                img.alt = "Hospital Image";
                // Remove the old image
                $("#hosp-img").empty();
                // Add the new image
                $("#hosp-img").append(img);
                $("#hosp-name").text(hosp.name);
                $("#hosp-rating").html(stars); 
                $("#hosp-distance").text(hosp.distance);
                $("#hosp-address").text(hosp.address);
                $("#hosp-phone").text(hosp.phone);
                $("#hosp-status").text(hosp.status);
                $("#hosp-open").text(hosp.openingTime);
                $("#hosp-close").text(hosp.closingTime);
                $("#hosp-website").text(hosp.website);
                var speciality = hosp.speciality;
                var specialityList = ``;
                for (let i = 0; i < speciality.length; i++) {
                    specialityList += `${speciality[i]}, `;
                }
                // Remove the last comma
                specialityList = specialityList.slice(0, -2);
                $("#hosp-speciality").text(specialityList);
                var petTypes = hosp.petTypes;
                var petTypesList = ``;
                for (let i = 0; i < petTypes.length; i++) {
                    petTypesList += `${petTypes[i]}, `;
                }
                // Remove the last comma
                petTypesList = petTypesList.slice(0, -2);
                $("#hosp-petTypes").text(petTypesList);
            };
            if (ind == 0) {
                card.click();
            }
            $("#hosp-list").append(card);
            ind++;
        });
    });
});

// Add onclick event to each card in the hospital list
function cardclick(card) {
    

    // Put the information of the selected hospital into the right panel
    var name = $(card).find(".card-title").text();
    var address = $(card).find(".store-address").text();
    var status = $(card).find(".store-status").text();
    var stars = $(card).find(".bi-star-fill").length;
    var rating = ``;
    for (let i = 0; i < stars; i++) {
        rating += `<i class="bi bi-star-fill" style="color: #F1C644; font-size: 2em;"></i>&nbsp&nbsp`;
    }
    $("#hosp-name").text(name);
    $("#hosp-address").text(address);
    $("#hosp-status").text(status);
    $("#hosp-rating").html(rating);

}