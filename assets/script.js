// lets add the date from moment library in to the jumbotron

// lets query select the paragraph element in the header to insert the date

// const dateEl = $("#currentDay");

// console.log(dateEl);

// const now = moment();

// const displayTime = () => {
//   const currentDate = now.format("dddd Do MMM YYYY");

//   dateEl.text(currentDate);
// };

// displayTime();

// lets ensure that the DOM has been fully loaded before html is manipulated

$(function () {
  console.log("DOM has been loaded");

  // lets create a variable to store the date from momentjs

  const now = moment();

  console.log(now.format("dddd, MMMM D"));

  // lets create a function to display the date

  const displayDate = () => {
    // lets use moment to format the current date
    const currentDate = now.format("dddd, MMMM D");

    // lets jquery the element and insert the date

    $("#currentDay").text(currentDate);
  };

  // lets create a init function here to execute all functions

  const init = () => {
    displayDate();
  };

  // lets invoke init

  init();
});
