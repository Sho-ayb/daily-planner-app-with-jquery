/*

- when the user opens the browser, will be presented with a header reading - Work Day Scheduler, a short paragraph and the current date in the format of day of week, month and day of month e.g Monday, January 23. 

- there will be a scheduler displaying the working hours of the day - 9am to 5pm, a text area allows for the user to add a schedule and this schedule can be saved to localStorage by clicking on the icon on the far right of each time-block. Saved schedules should remain persistent even after a browser refresh. 


- when the user opens the browser and views the scheduler - the current time of the day will be coloured different from past and future time-blocks. This present time-block should display a message in the description advising "Current time of day". 

- this means that we need to use momentjs to return the current time - and with this current time we can work out the past, present and future time-blocks. 

- in order to accomplish the above and to save each time-block to localStorage - we shall order each time-block within an array of objects. 

  - The following array of objects is indicated below: 

    const schedule = [

      {

        time: 9, 
        description: ''

      }, 

      {

        time: 10, 
        description: ''
      }, 

      {

        time: 11,
        description: ''

      }

    ]

This way we can loop through each object and match the time property of the object against the current time and then apply a background color to each element in question based on past, present and future times. 

    - we can achieve this by simply saying: if schedule.time is less than current time then change element(s) to a different background color or if schedule.time is greater than current time then change element(s) to a different background color. 

Additional

When the user clicks on save button - the buttons icon should change to another icon showing the user can delete the schedule created for that time-block. Once clicked the schedule should be removed from localStorage. 



*/

// lets ensure that the DOM has been fully loaded before html is manipulated

$(function () {
  console.log("DOM has been loaded");

  // lets create an array of objects to store all the schedules

  const schedule = [
    {
      time: 9,
      description: "",
    },
    {
      time: 10,
      description: "",
    },
    {
      time: 11,
      description: "",
    },
    {
      time: 12,
      description: "",
    },
    {
      time: 1,
      description: "",
    },
    {
      time: 2,
      description: "",
    },
    {
      time: 3,
      description: "",
    },
    {
      time: 4,
      description: "",
    },
    {
      time: 5,
      description: "",
    },
  ];

  // lets create a variable to store the date from momentjs

  const now = moment();

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
