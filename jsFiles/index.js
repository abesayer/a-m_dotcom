// Not So Secret Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCBqXXIeaItdcwzHYuQH_Equh4N3KLTOlk",
    authDomain: "wedding-rsvp-form-b11d7.firebaseapp.com",
    databaseURL: "https://wedding-rsvp-form-b11d7-default-rtdb.firebaseio.com",
    projectId: "wedding-rsvp-form-b11d7",
    storageBucket: "wedding-rsvp-form-b11d7.appspot.com",
    messagingSenderId: "601272836074",
    appId: "1:601272836074:web:7118c30df78c08fd741c93"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Stock Bootstrap Jquery for Form Validation
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

let counter = 0;
let secondGuest = false;

// Add a second form field
document.getElementById('add').addEventListener('click', function () {

    counter++;

    let addGuest = document.createElement('div');
    secondGuest = true;
    addGuest.innerHTML = `
            <div class="guest" id="form${counter}">
            <hr>
            <div class="form-row">
                            <div class="col-md-6 mb-3">
                                <!-- <label for="validationCustom01">First name</label> -->
                                <input type="text" class="form-control" id="firstName${counter}" name="first_name"
                                    placeholder="First Name" required>
                                <div class="invalid-feedback">
                                    Please provide your first Name.
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <!-- <label for="validationCustom02">Last name</label> -->
                                <input type="text" class="form-control" id="lastName${counter}" name="last_name"
                                    placeholder="Last Name" required>
                                <div class="invalid-feedback">
                                    Please provide your last name.
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-6 mb-3">
                                <!-- <label for="email">Email Address *</label> -->
                                <input type="email" class="form-control" id="email${counter}" placeholder="Email" name="email">
                                <div class="invalid-feedback">
                                    Please provide a valid email Address.
                                </div>
                            </div>
                            <div class="col-md-3 mb-3">
                                <!-- <label for="food">Meal Preference</label> -->
                                <select class="custom-select" id="meal${counter}" name="meal_choice" required>
                                    <option selected disabled value="">Meal Preference</option>
                                    <option value="chicken">Chicken</option>
                                    <option value="steak">Steak</option>
                                    <option value="veggie">Vegetarian</option>
                                    <option value="child">Kids Meal</option>
                                </select>
                                <div class="invalid-feedback">
                                    Please select a meal choice.
                                </div>
                            </div>
                            <div class="col-md-3 mb-3">
                                <!-- <label for="allergy">Allergy?</label> -->
                                <input class="form-control" id="allergies${counter}" placeholder="Allergies?" required>
                                <div class="invalid-feedback">
                                    Please let us know if you have any allegies.
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="rsvpBtn mt-4 btn btn-outline-secondary btn-sm removeGuest" type="button" id="removeGuest${counter}">Remove</button>
        `;

    document.getElementById('form0').appendChild(addGuest);

    if (counter === 1) {
        document.getElementById('maxGuests').style.display = 'block';
        let element = document.getElementById("add");
        element.classList.toggle("disabled");
    }

    document.getElementById('removeGuest1').onclick = () => {
        addGuest.remove();
        secondGuest = false;
        let element = document.getElementById("add");
        element.classList.toggle("disabled");
        document.getElementById('maxGuests').style.display = 'none';
    }

});

// Post form data to Firebase
document.getElementById('submitForm').addEventListener('click', (event) => {

    //Set variables from form fields
    //Guest 1
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let email = document.getElementById('email');
    let meal = document.getElementById('meal');
    let allergies = document.getElementById('allergies');
    //Guest 2
    let plusOne_firstName = document.getElementById('firstName1');
    let plusOne_lastName = document.getElementById('lastName1');
    let plusOne_email = document.getElementById('email1');
    let plusOne_meal = document.getElementById('meal1');
    let plusOne_allergies = document.getElementById('allergies1');

    // message is attributed to both guests
    let message = document.getElementById('message');

    //Single guest submission data
    let submissionData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        meal: meal.value,
        allergies: allergies.value,
        message: message.value,
    }

    //Guest and Plus One submission data
    if (secondGuest) {
        submissionData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            meal: meal.value,
            allergies: allergies.value,
            message: message.value,

            plusOne_firstName: plusOne_firstName.value,
            plusOne_lastName: plusOne_lastName.value,
            plusOne_email: plusOne_email.value,
            plusOne_meal: plusOne_meal.value,
            plusOne_allergies: plusOne_allergies.value
        }
    }

    // Post that afforementioned form data
    db.collection("weddingGuests").add(submissionData).then(() => {
        //Clean up the mess after the form gets posted
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        meal.value = '';
        allergies.value = '';
        message.value = '';

        document.getElementById('form1').remove();
        event.preventDefault();
        document.getElementById('add').setAttribute('enabled', true);
        document.getElementById('maxGuests').style.display = 'none';

    });

});

//Pop up modal to make you feel good about the form being submitted
document.getElementById('submitForm').onclick = function () {

    let popUp = document.createElement('div');
    popUp.innerHTML = `
        <div id="modal" class="modal">
            <div class="modal-content popUpFrame">
            <div class="modal-header">
                <span class="close" id="close">&times;</span>
            </div>
                <section class="popUpDesc">
                    <h3>Thank you!</h3>
                    <p>Your RSVP has been received</p>
                </section>                
            </div>
        </div>
    `;

    document.getElementById('main').appendChild(popUp);

    let modal = document.getElementById('modal');
    let close = document.getElementById('close');

    modal.style.display = "block";

    close.onclick = function () {
        popUp.remove();
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            popUp.remove();
        }
    }
};


