var childtmp1 = {
  name: "Turki",
  photo: "image/face1.png",
  gender: "male",
  dob: "2015-01-01",
  phone: "0540939534",
};
var childtmp2 = {
  name: "Lena",
  photo: "image/face2.png",
  gender: "female",
  dob: "2017-01-01",
  phone: "0520939534",
};

document.addEventListener("DOMContentLoaded", function () {
  console.log("The HTML page is rendered and ready.");
  localStorage.clear();
  if (localStorage.length == 0) {
    localStorage.setItem("childtmp1", JSON.stringify(childtmp1));
    localStorage.setItem("childtmp2", JSON.stringify(childtmp2));
  }
  for (i = 0; i < localStorage.length; i++) {
    var childData = JSON.parse(localStorage.getItem(localStorage.key(i)));
    // var name = childData.name;
    // var photo = childData.photo;
    // var gender = childData.gender;
    // var dob = childData.dob;
    // var phone = childData.phone;

    console.log(childData);

    // Find the main tag in the document
    var mainTag = document.querySelector("main");

    // Create a new div element
    var newDiv = document.createElement("div");

    // Add class name "kids" to the new div
    newDiv.classList.add("kids");

    // Create a new img element
    var newImg = document.createElement("img");

    // Set the source attribute of the img element
    newImg.src = childData.photo;
    newImg.alt = childData.name;
    newImg.width = 100;
    newImg.height = 100;

    // Create a new h4 element
    var newH4 = document.createElement("h4");

    // Set the text content of the h4 element
    newH4.textContent = childData.name;

    // Create a new p element
    var newP = document.createElement("p");

    // Set the text content of the p element
    newP.textContent = `Age : ${calculateAge(childData.dob)}`;

    // Append the new img, h4, and p elements to the new div
    newDiv.appendChild(newImg);
    newDiv.appendChild(newH4);
    newDiv.appendChild(newP);

    // Append the new div to the main tag
    mainTag.appendChild(newDiv);
  }
});

function calculateAge(dob) {
  var birthDate = new Date(dob);
  var currentDate = new Date();
  var age = currentDate.getFullYear() - birthDate.getFullYear();
  var m = currentDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
