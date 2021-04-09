

document.getElementById('rsvpForm').addEventListener('submit', (event) => {
    let plusOne_meal = document.getElementById('meal1');
    let plusOne_allergies = document.getElementById('allergies1');

    // db.collection("weddingGuests").add({
    //     firstName: firstName.value,
    //     lastName: lastName.value,
    //     email: email.value,
    //     meal: meal.value,
    //     allergies: allergies.value,
    //     message: message.value,

    //     plusOne_firstName: plusOne_firstName.value,
    //     plusOne_lastName: plusOne_lastName.value,
    //     plusOne_email: plusOne_email.value,
    //     plusOne_meal: plusOne_meal.value,
    //     plusOne_allergies: plusOne_allergies.value

    // }).then(() => {
    //     firstName.value = '';
    //     lastName.value = '';
    //     email.value = '';
    //     meal.value = '';
    //     allergies.value = '';
    //     message.value = '';

    //     document.getElementById('form1').remove();
    //     event.preventDefault();
    //     document.getElementById('add').setAttribute('enabled', true);
    //     document.getElementById('maxGuests').style.display = 'none';
    // });
    db.collection("weddingGuests").add({
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

    }).then(() => {
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

    // For testing purposes:
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(email.value);
    console.log(meal.value);
    console.log(allergies.value);
    console.log(message.value);
    console.log(plusOne_firstName.value);
    console.log(plusOne_lastName.value);
    console.log(plusOne_email.value);
    console.log(plusOne_meal.value);
    console.log(plusOne_allergies.value);
});