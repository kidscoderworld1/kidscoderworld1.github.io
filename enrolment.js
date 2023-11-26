document.addEventListener("DOMContentLoaded", function () {
  // Retrieve children's names from local storage or initialize an empty array
  for (i = 0; i < localStorage.length; i++) {
    var childData = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var childDropdown = document.getElementById("kids");
    var option = document.createElement("option");
    option.value = childData.name;
    option.textContent = childData.name;
    childDropdown.appendChild(option);
  }

  // Create a multidimensional array for courses
  var coursesArray = [
    { name: "Java", tutor: "Saleh Saad", prerequisite: "programming" },
    { name: "C++", tutor: "Noura Khalid", prerequisite: "programming" },
    { name: "Python", tutor: "Malak Saleh", prerequisite: "programming" },
    {
      name: "Intro to Roobotics",
      tutor: "Lama Fahad",
      prerequisite: "Robotics",
    },
    {
      name: "Fundamentals of programming",
      tutor: "Abdullah Fahad",
      prerequisite: "programming",
    },
    {
      name: "Engineering mathematics",
      tutor: "Saleh Saad",
      prerequisite: "Robotics",
    },
    {
      name: "Intelligent systems",
      tutor: "Noura Khalid",
      prerequisite: "Robotics",
    },
    {
      name: "Electronic circuit",
      tutor: "Malak Saleh",
      prerequisite: "Robotics",
    },
    { name: "CSS", tutor: "Lama Fahad", prerequisite: "programming" },
  ];

  // Function to fill filter options
  function fillFilterOptions(filterId, property) {
    var filterSelect = document.getElementById(filterId);
    // Get unique values for the specified property
    var uniqueValues = [
      ...new Set(coursesArray.map((course) => course[property])),
    ];
    // Populate the filter options
    uniqueValues.forEach((value) => {
      var option = document.createElement("option");
      // Convert to lowercase and remove spaces from the value
      option.value = value.toLowerCase().replace(/\s/g, "");
      option.textContent = value;
      filterSelect.appendChild(option);
    });
  }

  // Fill filter options for tutors and prerequisites
  fillFilterOptions("tutors", "tutor");
  fillFilterOptions("prerequisites", "prerequisite");

  var tutorFilter = document.getElementById("tutors");
  var prerequisiteFilter = document.getElementById("prerequisites");

  // Event listeners for filter changes
  tutorFilter.addEventListener("change", updateFilteredCourses);
  prerequisiteFilter.addEventListener("change", updateFilteredCourses);

  // Update the form with filtered courses based on selected filters
  function updateFilteredCourses() {
    var selectedTutor = tutorFilter.value;
    var selectedPrerequisite = prerequisiteFilter.value;

    // Filter courses based on selected tutor value
    var filteredTutorCourses = coursesArray.filter(
      (course) =>
        selectedTutor === "all" ||
        course.tutor.toLowerCase().replace(/\s/g, "") === selectedTutor
    );

    // Filter courses based on selected prerequisite value
    var filteredPrerequisiteCourses = coursesArray.filter(
      (course) =>
        selectedPrerequisite === "all" ||
        course.prerequisite.toLowerCase().replace(/\s/g, "") ===
          selectedPrerequisite
    );

    // Combine the filtered courses and remove duplicates
    var filteredCourses = Array.from(
      new Set([...filteredTutorCourses, ...filteredPrerequisiteCourses])
    );

    // Update the form with filtered courses
    updateFormWithCourses(filteredCourses);
  }

  // Update the form with courses
  function updateFormWithCourses(filteredCourses) {
    var coursesFieldset = document.querySelector("fieldset");

    // Clear previous options
    coursesFieldset.innerHTML = "";

    // Add filtered courses to the form
    filteredCourses.forEach((course) => {
      var label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" id="${course.name}" name="${
        course.name
      }" value="${course.name}">
            <img src="image/${course.name.toLowerCase()}.png" alt="" width="60" height="60">
            ${course.name} - ${course.tutor}`;
      coursesFieldset.appendChild(label);
    });
  }

  var form = document.querySelector("form");

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var childDropdown = document.getElementById("kids");
    // Check if a child is selected
    if (childDropdown.value === "") {
      alert("Please select a child.");
      return;
    }

    // Check if at least one course is selected
    var selectedCourses = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    if (selectedCourses.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    // Retrieve selected child
    var selectedChild = childDropdown.value;

    // Display information on the page
    displayInformation(selectedChild, selectedCourses);
  });

  function displayInformation(child, courses) {
    // Create a container for the information at the top of the form
    var infoTopContainer = document.createElement("div");
    infoTopContainer.id = "info-top-container";

    // Display child name
    var childNameElement = document.createElement("p");
    childNameElement.textContent = "Child Name: " + child;

    // Display list of courses and tutors
    var coursesListElement = document.createElement("ul");
    courses.forEach(function (course) {
      var listItem = document.createElement("li");
      listItem.textContent =
        "Course: " + `${course.value} - Tutor: ${getTutorByName(course.value)}`;
      coursesListElement.appendChild(listItem);
    });

    // Append child name and courses to the top container
    infoTopContainer.appendChild(childNameElement);
    infoTopContainer.appendChild(coursesListElement);

    // Remove previous top information if exists
    var previousTopInfoContainer =
      document.getElementById("info-top-container");
    if (previousTopInfoContainer) {
      previousTopInfoContainer.remove();
    }

    // Append the top container to the form
    form.insertBefore(infoTopContainer, form.firstChild);

    // Clear the form
    form.reset();
  }

  // Function to get tutor by course name
  function getTutorByName(courseName) {
    var course = coursesArray.find((course) => course.name === courseName);
    return course ? course.tutor : "";
  }
});
