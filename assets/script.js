/*

I have started again as the previous was not working correctly to collect the data from local storage and display to the correct textareas - data was saving but then after four schedules stored, the scheduleRecord array would empty and only display the last schedule in the correct textarea. This was a weird behaviour that was unexpected and could not identify. 

I have decided not to store the schedules within an object and push it to a new array, instead will use jquery to target the specific textarea with the specific id and the data in stored in its object and pass these to variables where they will then be saved to local storage and then able to retrieve the said data. 

*/

$(document).ready(function () {
  // lets create a global variable to store the date object from moment library

  const now = moment();

  $(".saveBtn").on("click", (e) => {
    e.preventDefault();
    var id = $(e.target).siblings("textarea").attr("id");
    var storedData = $(e.target).siblings("textarea").val();

    console.log("id", id, "stored data", storedData, "this", $(this));
    console.log(e.target);
    localStorage.setItem(id, storedData);
  });

  for (let i = 9; i < 18; i++) {
    var storedLocal = localStorage.getItem(i);
    $("#" + i).val(storedLocal);
  }

  // lets create a display date function here

  const displayDate = () => {
    const date = now.format("dddd, MMMM D");

    $("#currentDay").text(date);
  };

  // lets create a function to style the textareas to appear with a different background color based on the current time

  const changeTextArea = () => {
    // lets create two empty arrays to store which textarea with the ids less than the current time and textareas with the ids greater than the current time

    // const prevTimes = [];
    // const futureTimes = [];

    const currentTime = now.format("H");

    console.log("current time: ", Number.parseInt(currentTime));

    // lets first style the specific textarea that matches the currentTime
    // lets extract the complete textareas and the loop through each textarea and create conditionals where we can then apply a css background color

    const txtarea = $("textarea");

    console.log(txtarea);
    console.log(txtarea.attr("id"));

    // note: i found that not converting the both id and the current time to a number produces unexpect result and did not match the condition correctly. Now converted to Number integer and background color is being set correctly on the specific textareas past, present and future times

    $.each(txtarea, function (key, area) {
      console.log(area);

      // the present time
      if (Number.parseInt(area.id) === Number.parseInt(currentTime))
        $(area).css("background-color", "red");

      // past time
      if (Number.parseInt(area.id) < Number.parseInt(currentTime))
        $(area).css("background-color", "grey");

      // future time
      if (Number.parseInt(area.id) > Number.parseInt(currentTime))
        $(area).css("background-color", "yellowgreen");
    });
  };

  // lets create an init function here to execute all functions

  const init = () => {
    displayDate();
    changeTextArea();
  };

  // lets invoke the init function

  init();
});
