$(function () {
    $.getJSON('data/hosp.json', function ({ data }) {
        var card = ``;
        $.each(data, function (i, hosp) {
            var stars = ``;
            for (let i = 0; i < hosp.rating; i++) {
                // Append a star with color yellow and font size 20px
                stars += `<i class="bi bi-star-fill" style="color: #F1C644; font-size: 2em;"></i>&nbsp&nbsp`;
            }
            var card = 
            `<div class="w-100 p-3">
                <div class="card shadow-sm"> 
                    <div class="card-body">
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
                </div>
            </div>`;
            $("#hosp-list").append(card);
        });
    });
});