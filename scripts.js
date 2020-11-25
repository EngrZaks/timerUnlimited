const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const timerControls = document.querySelector(".timer__controls");
const audio = document.querySelector(".audio");
const add = document.querySelector(".add");
const remove = document.querySelector(".remove");
const timer__button = document.querySelectorAll(".timer__button");

let countdown;
let playsound;
var stopButton;
function timer(seconds) {
   //first check and clear any existing timer incase of any
   clearInterval(countdown);
   clearTimeout(playsound);
   stopButton = document.createElement("button");
   stopButton.textContent = "Stop Timer";
   document.body.appendChild(stopButton);
   stopButton.classList.add("stop");
   stopButton.addEventListener("click", (e) => {
      e.preventDefault();
      clearInterval(countdown);
      clearTimeout(playsound);
      timerDisplay.textContent = "";
      document.title = "";
      endTime.textContent = "";
      document.body.removeChild(stopButton);
   });
   const now = Date.now();
   const then = now + seconds * 1000;
   displayTimerLeft(seconds);
   displayEndTime(then);

   countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft <= 0) {
         clearInterval(countdown);
      }
      displayTimerLeft(secondsLeft);
   }, 1000);
   playsound = setTimeout(() => {
      audio.play();
   }, seconds * 1000);
}
function displayTimerLeft(seconds) {
   const minutes = Math.round(seconds / 60);
   const secondsLeft = seconds % 60;
   display = `${minutes} : ${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
   timerDisplay.textContent = display;
   document.title = display;
}
function displayEndTime(timestamp) {
   const end = new Date(timestamp);
   const hour = end.getHours();
   const minutes = end.getMinutes();
   let pm;
   if (hour >= 12) {
      pm = true;
   } else {
      pm = false;
   }
   var adjustedHour = function () {
      if (hour > 12) {
         return hour - 12;
      } else if (hour === 0) {
         return 12;
      } else return hour;
   };
   var endTimeText = `Be back at ${adjustedHour()}: ${
      minutes < 10 ? "0" : ""
   }${minutes}`;
   endTime.textContent = pm ? endTimeText + " PM" : endTimeText + " AM";
}
function startTimer(e) {
   const seconds = this.dataset.time;
   timer(seconds);
}
buttons.forEach((button) => {
   button.addEventListener("click", startTimer);
});
document.customForm.addEventListener("submit", function (e) {
   e.preventDefault();
   min = this.minutes.value;
   timer(min * 60);
   this.reset();
   console.log(min);
});
//add a customized button       done✔

add.addEventListener("click", () => {
   var addForm = document.querySelector(".add-form");
   function showForm() {
      addForm.style.display = "block";
      setTimeout(() => {
         addForm.style.opacity = 1;
      }, 250);
   }
   function closeForm() {
      addForm.style.opacity = 0;
      setTimeout(() => {
         addForm.style.display = "none";
      }, 250);
   }
   function creatButton(e) {
      e.preventDefault();
      // e.stopPropagation();
      var name = this.buttonname.value;
      var duration = this.duration.value;
      var color = this.color.value;
      var mybutton = document.createElement("button");
      mybutton.textContent = name;
      mybutton.classList.add("timer__button");
      mybutton.style.background = color;
      timerControls.appendChild(mybutton);
      mybutton.dataset.time = duration * 60;
      mybutton.addEventListener("click", startTimer);
      deleteButton(mybutton);
      this.reset();
      closeForm();
   }
   showForm();
   document.add.addEventListener("submit", creatButton, {
      capture: false,
      once: true,
   });
   document
      .querySelector(".close")
      .addEventListener("click", () => closeForm());
});

function deleteButton(buttonToDelete) {
   var deletNow =
      remove.addEventListener("click", function () {
         let clickStop = true;
         buttonToDelete.forEach((button) => {
            function deleteIt() {
               if (clickStop) {
                  stopButton.click();
               }
               // button.style.display = "none";
               button.style.border = "3px solid white";
               button.classList.add("delete");
            }
            button.addEventListener("click", deleteIt);
         });
         const confirm = document.querySelector(".confirm");
         confirm.style.display = "block";
         confirm.addEventListener("click", (e) => {
            e.preventDefault();
            var selectedToRemove = document.querySelectorAll(".delete");
            selectedToRemove.forEach((button) => {
               button.style.display = "none";
            });
            clickStop = false;
            e.target.style.display = "none";
         });
      }) ||
      remove.addEventListener("click", function () {
         buttonToDelete.addEventListener("click", () => {
            stopButton.click();
            buttonToDelete.style.display = "none";
            console.log(buttonToDelete);
         });
      });
}
deleteButton(timer__button);

// function newdeletNow() {
//    let buttonsToDelet = [];
//    remove.removeChild("");
// }
// remove.addEventListener("click", newdeletNow);

//add a remove button
// get 12 oclock to show 12 instead of 0     done✔
//show AM or PM for time of return          done✔
//add sound at the end of the alarm          done✔
