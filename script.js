const date = new Date();

// Get this day 
let today = date.getDate();
// get the day number of the week
let dayNumber = date.getDay();
// Get the first day of the current week (Sunday)

let todayResult = today - dayNumber;
console.log(todayResult);

// Get the month
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthResult = (monthNames[date.getMonth()]);
console.log(monthResult);

let yearResult = date.getFullYear();
console.log(yearResult);

// Set the date inside the element
const para = document.createElement("p");
const node = document.createTextNode(todayResult + " " + monthResult + " " + yearResult);
para.appendChild(node);
const element = document.getElementById("date");
element.appendChild(para);

// ------------------------------------------------------------------------------------------------

const more = document.querySelectorAll(".more");

for (var i = 0; i < more.length; i++) {
    (function(index) {
        more[index].addEventListener("click", function() {
            let parent = more[index].parentNode;
            let previous = parent.previousElementSibling;

            if (previous.style.display === "none") {
                previous.style.display = "block";
            } else {
                previous.style.display = "none";
            }

            if (more[index].innerHTML === "More") {
                more[index].innerHTML = "Less"
            }
            else {
                more[index].innerHTML = "More"
            }
        })
    })(i);
} 