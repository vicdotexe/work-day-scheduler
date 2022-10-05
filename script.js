var container = $(".container");

function onSaveClick(event){
    var button = $(event.target);
    var hour = button.attr("data-hour");
    var textArea = button.parent().find("textarea");
    localStorage.setItem(hour, textArea.val());
}

//todo: see if there's a better way to do this, feels hacked together.
/**
 * Returns the relation the time passed in and the current hour.
 * @param {moment} time 
 * @returns "past" "present" or "future"
 */
function getCurrentRelation(time){
    if (moment().isBetween(moment(time), moment(time).add(1,"hours"))){
        return "present";
    }
    return moment().isAfter(moment(time)) ? "past" : "future";
}

$("#currentDay").text(moment().format("dddd, MMM Do")); // set the p text to current date in specific format (Tuesday, Oct 4th)

for(var i = 9; i < 18; i++){

    var eventHour = moment(i, ["H"]); // this moment (military time) without minutes or seconds.
    var hourFormatted = eventHour.format("h A"); // a string of just the hour and AM/PM (9 AM)
    var timeRelation = getCurrentRelation(eventHour); // a string: either "past", "present" or "future" based on what hour this row is.

    var row = $("<div>");
    row.addClass("row");

    var hourText = $("<p>");
    hourText.addClass("col-1").addClass("text-right");
    hourText.addClass("hour");
    hourText.text(eventHour.format("h A"));
    row.append(hourText);

    var textArea = $("<textarea>");
    textArea.addClass("col-10")
    textArea.addClass(timeRelation);
    row.append(textArea);

    var fromStorage = localStorage.getItem(hourFormatted);
    if(fromStorage){
        textArea.val(fromStorage);
    }

    var saveButton = $("<button>");
    saveButton.addClass("col-1");
    saveButton.addClass("saveBtn");
    saveButton.text("Save");
    saveButton.attr("data-hour", hourFormatted);
    saveButton.on("click", onSaveClick);
    row.append(saveButton);

    container.append(row);
    
}