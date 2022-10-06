var container = $(".container");

// saves the textarea to local storage
function onSaveClick(event){
    var button = $(event.target);
    var hour = button.attr("data-hour");
    var textArea = button.parent().find("textarea");
    localStorage.setItem(hour, textArea.val());
    button.removeClass("dirty");
}

// callback for when textarea is altered
function onInput(event){
    var textArea = $(event.target);
    var button = textArea.parent().find("button");
    var hour = button.attr("data-hour");
    
    var saved = localStorage.getItem(hour);
    if (saved != textArea.val()){
        button.addClass("dirty");
    }else{
        button.removeClass("dirty");
    }

}

//todo: see if there's a cleaner way to do this, feels hacked together.
/**
 * Returns the relation the time passed in and the current hour.
 * @param {moment} time 
 * @returns "past" "present" or "future"
 */
function getCurrentRelation(time){
    console.log(time);
    var now = moment();
    if (now.isBetween(moment(time), moment(time).add(1,"hours")) || now.format("h") == time.format("h")){
        return "present";
    }
    return now.isAfter(moment(time)) ? "past" : "future";
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
    textArea.on("input",function(event){onInput(event)});
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