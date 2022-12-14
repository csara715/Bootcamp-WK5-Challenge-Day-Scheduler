$("#currentDay").text(moment().format("dddd, MMMM Do"));

var currentHour = moment().format("HH");
var eventList = localStorage.getItem("eventList");
var idList = localStorage.getItem("idList");

function init() {
    if (eventList) {
        eventList = JSON.parse(eventList);
        idList = JSON.parse(idList);
      } else {
        eventList = [];
        idList = [];
      }
    renderSchedule();  
};

//Code to color code the time blocks
$("tr").each(function () {
  if (this.id === currentHour) {
    $(this).children().eq(1).addClass("present");
  } else if (this.id > currentHour) {
    $(this).children().eq(1).addClass("future");
  } else {
    $(this).children().eq(1).addClass("past");
  }
  return;
});

// Add events to the schedule
var addEvent = function (event) {
  event.preventDefault();

  var timeSlot = $(this).parent().parent().children().eq(1);
  var eventId = $(this).parent().parent().attr("id");
  var newEvent = timeSlot.children().val().trim();
  eventList.push(newEvent);
  idList.push(eventId);
  localStorage.setItem("eventList", JSON.stringify(eventList));
  localStorage.setItem("idList", JSON.stringify(idList));
  renderSchedule();
};

// Render the events stored in local storage to the schedule
function renderSchedule() {
  if (eventList.length === 0) {
    return;
  } else {
    var storedEvents = JSON.parse(localStorage.getItem("eventList"));
    var storedIds = JSON.parse(localStorage.getItem("idList"));

    for (j = 0; j < storedIds.length; j++) {
      $("tr").each(function () {
        if (this.id === storedIds[j]) {
          var textBox = $(this).children().eq(1);
          textBox.children().append().val(storedEvents[j]);
        }
      });
    }
  }
}

init();

$("i").on("click", addEvent);