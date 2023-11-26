
document.addEventListener("DOMContentLoaded", function () {

    const sortSelect = document.getElementById("sortSelect");

    const tutorsContainer = document.querySelector(".container");

 

    sortSelect.addEventListener("change", function () {

        const sortOrder = sortSelect.value;

 

        // Get the list of tutor elements

        const tutors = Array.from(tutorsContainer.querySelectorAll(".tutors"));

 

        // Sort tutors based on the selected order

        tutors.sort(function (a, b) {

            const nameA = a.querySelector("h4").textContent.trim().toUpperCase();

            const nameB = b.querySelector("h4").textContent.trim().toUpperCase();

 

            if (sortOrder === "asc") {

                return nameA.localeCompare(nameB);

            } else {

                return nameB.localeCompare(nameA);

            }

        });

 

        // Remove existing tutors from the container

        tutors.forEach(function (tutor) {

            tutorsContainer.removeChild(tutor);

        });

 

        // Append sorted tutors to the container

        tutors.forEach(function (tutor) {

            tutorsContainer.appendChild(tutor);

        });

    });

});