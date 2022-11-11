function onClick() {

    $.getJSON('data/boarding.json', function ({ data }) {
      $.each(data, function (i, place) {
  
       var modal =  ` 
       <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">${place.name}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
             
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
    if (signInButton.innerText== "Sign in") {
        $("#sign-in").text('Log Out');
    } else if (signInButton.innerText == "Log Out") {
        $("#sign-in").text('Sign in');
    }
}