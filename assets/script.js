/*

I have started again as the previous was not working correctly to collect the data from local storage and display to the correct textareas - data was saving but then after four schedules stored, the scheduleRecord array would empty and only display the last schedule in the correct textarea. This was a weird behaviour that was unexpected and could not identify. 

I have decided not to store the schedules within an object and push it to a new array, instead will use jquery to target the specific textarea with the specific id and the data in stored in its object and pass these to variables where they will then be saved to local storage and then able to retrieve the said data. 

*/

$(document).ready(function () {
  // lets create a global variable to store the date object from moment library

  const now = moment();

  // lets create a display date function here

  const displayDate = () => {
    const date = now.format("dddd, MMMM D");

    $("#currentDay").text(date);
  };

  // lets create a function here to add a schedule to local storage

  const addSchedule = () => {
    $(".saveBtn").on("click", (e) => {
      // lets prevent the page reloading after each button click

      e.preventDefault();

      // lets create a variable here to store all the previous and next data recieved to local storage when the user clicks on the button

      // Note: if we simply create an empty array to push to it, i have noted that local storage will be cleared and then overwritten with the schedule data of the textarea the user wants to save, this is why we need to parse the current data stored from local storage here, then below will save the next append to the previous schedules already stored

      const scheduleRecord = window.localStorage.getItem("schedule")
        ? JSON.parse(window.localStorage.getItem("schedule"))
        : [];

      // lets extract the id and the value from the textarea
      var id = $(e.target).closest("button").siblings("textarea").attr("id");
      var storedData = $(e.target).closest("button").siblings("textarea").val();

      console.log("id", id, "stored data", storedData);
      console.log(e.target);

      // lets push these vars to scheduleRecord before storing them to local storage

      scheduleRecord.push({ id, storedData });

      // lets now save this to local storage
      window.localStorage.setItem("schedule", JSON.stringify(scheduleRecord));
    });

    // for (let i = 9; i < 18; i++) {
    //   var storedLocal = localStorage.getItem(i);
    //   $("#" + i).val(storedLocal);
    // }
  };

  // lets create a function here to display all the data stored in local storage to each text area in question

  const displayAllSchedules = () => {
    // lets first retrieve all the data stored from local storage
    // now that we have the data from local storage, let loops through parsedStorage
    // and display each data in the textarea
  };

  // lets create a function to style the textareas to appear with a different background color based on the current time

  const changeTextArea = () => {
    const currentTime = now.format("H");

    console.log("current time: ", Number.parseInt(currentTime));

    // lets first style the specific textarea that matches the currentTime
    // lets extract the complete textareas and the loop through each textarea and create conditionals where we can then apply a css background color

    const txtarea = $("textarea");

    // note: i found that not converting the both id and the current time to a number produces unexpect result and did not match the condition correctly. Now converted to Number integer and background color is being set correctly on the specific textareas past, present and future times

    $.each(txtarea, function (key, area) {
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
    addSchedule();
    displayAllSchedules();
  };

  // lets invoke the init function

  init();
});
