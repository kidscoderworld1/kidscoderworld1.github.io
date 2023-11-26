document
  .getElementById("kidPhoto")
  .addEventListener("change", function (event) {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("childPhotoDisplay");
      output.src = reader.result;
      output.style.display = "block";
      child.photo = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  });

var child = {
  name: "",
  photo: "",
  gender: "",
  dob: "",
  phone: "",
};

function validateForm() {
  // Validate Name
  var name = document.getElementById("kidName").value;
  child.name = name;
  if (name === "" || !isNaN(name.charAt(0))) {
    alert("Name is required and cannot start with a number.");
    return;
  }

  // Validate Photo
  var photo = document.getElementById("kidPhoto").value;
  if (photo === "") {
    alert("Photo is required.");
    return;
  }

  // Validate Date of Birth
  var dob = document.getElementById("kidDOB").value;
  child.dob = dob;
  if (dob === "") {
    alert("Date of Birth is required.");
    return;
  } else {
    var year = new Date(dob).getFullYear();
    if (year > 2017) {
      alert("Children younger than 6 years old are not accepted.");
      return;
    }
  }

  // Validate Gender
  var gender = document.querySelector('input[name="gender"]:checked');
  child.gender = gender.value;
  if (!gender) {
    alert("Please select a gender.");
    return;
  }

  // Validate Phone
  var phone = document.getElementById("phone").value;
  child.phone = phone;
  var phoneRegex = /^\d{10}$/;
  if (!phone.match(phoneRegex)) {
    alert("Phone number should be 10 digits.");
    return;
  } else {
  }

  // Validate Email
  var email = document.getElementById("email").value;
  child.email = email;
  if (email === "") {
    alert("Email is required.");
    return;
  }

  //   If validation passes
  localStorage.setItem(makeid(10), JSON.stringify(child));

  // logic to display print-only div and hide anything else then print the page then reset the form
  addPrintCode();

  window.print();

  //clean the form after printing
  const formToReset = document.getElementById("kid_form");
  formToReset.reset();
}

function addPrintCode() {
  document.getElementById("print-only").innerHTML +=
    "<img src=" +
    child.photo +
    " width=" +
    "100" +
    " height=" +
    "100" +
    ">" +
    "<p>Child Name :" +
    child.name +
    "</p>" +
    "<p>DOB: " +
    child.dob +
    "</p>" +
    "<p>Gender: " +
    child.gender +
    "</p>" +
    "<p>Phone: " +
    child.phone +
    "</p>" +
    "<p>Email: " +
    child.email +
    "</p>";
}

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
