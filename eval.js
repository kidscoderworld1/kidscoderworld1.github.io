document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.querySelector('button[type="submit"]');
    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Check if a course is selected
        var courseSelect = document.getElementById('course-select');
        if (courseSelect.value === "") {
            alert("Please select a course.");
            return;
        }

        // Check if a rating is selected
        var ratingInputs = document.querySelectorAll('input[name="rating"]');
        var userRating = "";
        for (var i = 0; i < ratingInputs.length; i++) {
            if (ratingInputs[i].checked) {
                userRating = ratingInputs[i].value;
                break;
            }
        }
        if (userRating === "") {
            alert("Please select a rating.");
            return;
        }

        // If all checks pass, display a customized alert message
        var selectedCourse = courseSelect.options[courseSelect.selectedIndex].text;
        alert("Thank you for your feedback!\nYour rating for course " + selectedCourse + " is " + userRating);
    });
});
