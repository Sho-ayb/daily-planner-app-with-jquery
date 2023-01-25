/*

- when the user opens the browser, will be presented with a header reading - Work Day Scheduler, a short paragraph and the current date in the format of day of week, month and day of month e.g Monday, January 23. 

- there will be a scheduler displaying the working hours of the day - 9am to 5pm, a text area allows for the user to add a schedule and this schedule can be saved to localStorage by clicking on the icon on the far right of each time-block. Saved schedules should remain persistent even after a browser refresh. 

    - the user should be able to save the schedule by clicking on the saveBtn, which will store the schedule desc in the appropriate object in question e.g if the user clicks save on a particular time-slot the description will be saved to the object that matches the id of the textarea id. For this purpose all objects will contain an id number that will go along with the description when saved to localStorage. 

    - note that the user will not be able to add a schedule or a description to previous times but can only add to the current and future schedules. This means that previous timeslots will need to be disabled. 


- when the user opens the browser and views the scheduler - the current time of the day will be coloured different from past and future time-blocks. This present time-block should display a message in the description advising "Current time of day". 

- this means that we need to use momentjs to return the current time - and with this current time we can work out the past, present and future time-blocks. 

- in order to accomplish the above and to save each time-block to localStorage - we shall order each time-block within an array of objects. 

  - The following array of objects is indicated below: 

    const schedule = [

      {
        id: 1,
        time: 9, 
        description: ''

      }, 

      {
        id: 2,
        time: 10, 
        description: ''
      }, 

      {
        id: 3,
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

  // lets create an array of objects to store all the schedules - the ids need to start from 0 so that we can match the id later in code below

  const schedule = [
    {
      id: 0,
      time: 9,
      description: "",
    },
    {
      id: 1,
      time: 10,
      description: "",
    },
    {
      id: 2,
      time: 11,
      description: "",
    },
    {
      id: 3,
      time: 12,
      description: "",
    },
    {
      id: 4,
      time: 13,
      description: "",
    },
    {
      id: 5,
      time: 14,
      description: "",
    },
    {
      id: 6,
      time: 15,
      description: "",
    },
    {
      id: 7,
      time: 16,
      description: "",
    },
    {
      id: 8,
      time: 17,
      description: "",
    },
  ];

  console.log("Schedule: ", schedule);

  // lets create the function to save the schedule to local storage

  const storeToLocal = (scheduleRecord) => {
    window.localStorage.setItem("schedule", JSON.stringify(scheduleRecord));
  };

  // lets create the function to get the schedule records from local storage

  const getFromLocal = () => {
    const parsedSchedule = window.localStorage.getItem("schedule")
      ? JSON.parse(window.localStorage.getItem("schedule"))
      : [];

    return parsedSchedule;
  };

  // lets create a variable to store the date from momentjs

  const now = moment();

  // lets create a function to display the date

  const displayDate = () => {
    // lets use moment to format the current date
    const currentDate = now.format("dddd, MMMM D");

    // lets jquery the element and insert the date

    $("#currentDay").text(currentDate);
  };

  // lets create a function to get the current time and change the background colour of  the text area

  const getCurrentTime = () => {
    // lets get moment wrapper object to return to us the current hour only

    const hour = now.format("H");

    // return hour;

    return 13; // returning this for testing purposes
  };

  // lets create a function to change the background colour of the text area that matches the current hour

  const changeTextArea = (time) => {
    // lets create an empty arrays here to store all the previous times and future times
    const prevTimes = [];
    const futureTimes = [];

    // lets loop through the array of object and match the hour against time property

    for (let i = 0; i < schedule.length; i++) {
      // console.log(schedule[i].time);

      // present time
      if (schedule[i].time == time) {
        // dont use strict equals here
        console.log("the hour is ", time);

        $("#" + time).css("background-color", "red");
      }

      // previous time
      if (schedule[i].time < time) {
        prevTimes.push(schedule[i].time);
      }

      // future time
      if (schedule[i].time > time) {
        futureTimes.push(schedule[i].time);
      }
    }

    console.log(prevTimes);
    console.log(futureTimes);

    // now we have pushed to these arrays, we need to check if the array is empty
    // then we can loop through each item in the array and pass the time as the selector with jquery

    if (prevTimes.length !== 0) {
      for (let i = 0; i < prevTimes.length; i++) {
        $("#" + prevTimes[i]).css("background-color", "grey");
      }
    }

    if (futureTimes.lenth !== 0) {
      for (let i = 0; i < futureTimes.length; i++) {
        $("#" + futureTimes[i]).css("background-color", "limegreen");
      }
    }
  };

  // we need a function now to add the schedule to the object description

  const addSchedule = (save) => {
    // lets create an empty array here to save schedules to store to localStorage

    scheduleRecord = [];

    // lets attach an event listener on to the save button

    $(".saveBtn").on("click", (e) => {
      // we need to loop through the array of objects and check if the id of the schedule matches with the id of of textarea element, when there is a match, we want to save this schedule to the correct object by referencing the objects id

      // console.log(e.target.closest("button")); // returns the closest parent element specified, using this so that icon element is not returned when it is clicked..

      const siblingEl = $(e.target).closest("button").prev(); // prev returns the immediate previous sibling of the element in the DOM

      // Returns true if the request was successful.
      console.log(siblingEl);
      console.log(siblingEl[0].id); // this returns the id of the textarea element

      const siblingElId = siblingEl[0].id; // this returns string

      // console.log("sibling id", Number(siblingElId)); // converts to Number

      console.log(
        "before loop in addSchedule function - scheduleRecord",
        scheduleRecord
      );
      console.log("inside schedule", schedule);
      // lets loop now

      scheduleRecord = []; // this helped to clear out the array before pushing again - thanks to Abduraghman from AskBCS

      for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].time === Number(siblingElId)) {
          schedule[i].description = $("#" + schedule[i].time).val();
        }

        if (schedule[i].description !== "") {
          scheduleRecord.push({
            id: schedule[i].id,
            time: schedule[i].time,
            description: schedule[i].description,
          });

          // we should pass the scheduleRecord array to this function and we can check if it is not empty
          console.log("inside loop scheduleRecord: ", scheduleRecord);
          save(scheduleRecord);
        }
      }
    });
  };

  // lets create a function here to render any previous schedules from local storage to each individual time slot, we can do this by invoking the getFromLocal function which returns to us an array of objects stored to local storage. We can then use Object.keys to extract the ids of the array of objects and check this against the id of schedules array of objects.

  const displayAllSchedules = (parsedSchedule) => {
    console.log(
      "parsed schedule inside displayAllSchedules function: ",
      parsedSchedule
    );

    // lets extract the keys from parsedSchedule

    // const keys = Object.keys(parsedSchedule);

    // console.log("keys length of parsedSchedule: ", keys.length);

    // lets create a variable here to store the textarea element

    let textareaEl = $(".description");

    console.log(textareaEl);

    $.each(textareaEl, function (key, textarea) {
      console.log("key", key + " textarea", textarea);

      const text = $("#" + textarea.id);

      for (let i = 0; i < parsedSchedule.length; i++) {
        if (parsedSchedule.indexOf(schedule[i].description) !== -1) {
          if (parsedSchedule[i].time == 9 && textarea.id == 9) {
            // textarea.val(parsedSchedule[i].description);

            console.log("inside loop");

            text.val(parsedSchedule[i].description);
          }
        }

        if (parsedSchedule[i].time == 10 && textarea.id == 10) {
          // textarea.val(parsedSchedule[i].description);
        }

        if (parsedSchedule[i].time == 11 && textarea.id == 11) {
          // textarea.val(parsedSchedule[i].description);
        }

        if (parsedSchedule[i].time == 12 && textarea.id == 12) {
          // textarea.val(parsedSchedule[i].description);
        }

        if (parsedSchedule[i].time == 13 && textarea.id == 13) {
          // textarea.val(parsedSchedule[i].description);
        }

        if (parsedSchedule[i].time == 14 && textarea.id == 14) {
          // textarea.val(parsedSchedule[i].description);
        }

        if (parsedSchedule[i].time == 15 && textarea.id == 15) {
          // textarea.val(parsedSchedule[i].description);
        }

        if (parsedSchedule[i].time == 16 && textarea.id == 16) {
          // textarea.val(parsedSchedule[i].description);
        }

        if (parsedSchedule[i].time == 17 && textarea.id == 17) {
          // textarea.val(parsedSchedule[i].description);
        }
      }

      // if (key == 0 && value.id == 9) {
      //   const textarea = $("#" + value.id);

      //   for (let i = 0; i < parsedSchedule.length; i++) {
      //     if (parsedSchedule[i].id == key) {
      //       textarea.val(parsedSchedule[i].description);
      //     }
      //   }
      // }

      // if (key == 1 && value.id == 10) {
      //   const textarea = $("#" + value.id);

      //   for (let i = 0; i < parsedSchedule.length; i++) {
      //     if (parsedSchedule[i].id == key) {
      //       textarea.val(parsedSchedule[i].description);
      //     }
      //   }
      // }

      // if (key == 2 && value.id == 11) {
      //   const textarea = $("#" + value.id);

      //   for (let i = 0; i < parsedSchedule.length; i++) {
      //     if (parsedSchedule[i].id == key) {
      //       textarea.val(parsedSchedule[i].description);
      //     }
      //   }
      // }

      // if (key == 3 && value.id == 12) {
      //   const textarea = $("#" + value.id);

      //   for (let i = 0; i < parsedSchedule.length; i++) {
      //     if (parsedSchedule[i].id == key) {
      //       textarea.val(parsedSchedule[i].description);
      //     }
      //   }
      // }

      // if (key == 4 && value.id == 13) {
      //   const textarea = $("#" + value.id);

      //   for (let i = 0; i < parsedSchedule.length; i++) {
      //     if (parsedSchedule[i].id == key) {
      //       textarea.val(parsedSchedule[i].description);
      //     }
      //   }
      // }

      // if (key == 5 && value.id == 14) {
      //   const textarea = $("#" + value.id);

      //   for (let i = 0; i < parsedSchedule.length; i++) {
      //     if (parsedSchedule[i].id == key) {
      //       textarea.val(parsedSchedule[i].description);
      //     }
      //   }
      // }

      // if (key == 6 && value.id == 15) {
      //   const textarea = $("#" + value.id);

      //   for (let i = 0; i < parsedSchedule.length; i++) {
      //     if (parsedSchedule[i].id == key) {
      //       textarea.val(parsedSchedule[i].description);
      //     }
      //   }
      // }

      // if (key == 7 && value.id == 16) {
      //   const textarea = $("#" + value.id);

      //   for (let i = 0; i < parsedSchedule.length; i++) {
      //     if (parsedSchedule[i].id == key) {
      //       textarea.val(parsedSchedule[i].description);
      //     }
      //   }
      // }

      // if (key == 8 && value.id == 17) {
      //   const textarea = $("#" + value.id);

      //   for (let i = 0; i < parsedSchedule.length; i++) {
      //     if (parsedSchedule[i].id == key) {
      //       textarea.val(parsedSchedule[i].description);
      //     }
      //   }
      // }
    });
  };

  // lets create a init function here to execute all functions

  const init = () => {
    displayDate();
    changeTextArea(getCurrentTime());
    addSchedule(storeToLocal); // passing this function to function
    displayAllSchedules(getFromLocal());
  };

  // lets invoke init

  init();
});
