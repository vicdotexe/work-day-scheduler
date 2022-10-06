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

/**
 * Gets the hour's relation to present time.
 * @param {number} hour the hour to check
 * @returns "past" "present" or "future"
 */
function getCurrentRelation(hour){
    var now = moment().format("H");

    if (hour == now){
        return "present";
    }

    return hour < now ? "past" : "future";
}

$("#currentDay").text(moment().format("dddd, MMM Do")); // set the p text to current date in specific format (Tuesday, Oct 4th)

for(var i = 9; i < 18; i++){

    var timeRelation = getCurrentRelation(i); // a string: either "past", "present" or "future" based on what hour this row is.

    var row = $("<div>");
    row.addClass("row d-flex");

    var hourText = $("<p>");
    hourText.addClass("col-1").addClass("text-right");
    hourText.addClass("hour");
    hourText.text(moment(i, "H").format("ha"));
    row.append(hourText);

    var textArea = $("<textarea>");
    textArea.addClass("col-10")
    textArea.addClass(timeRelation);
    textArea.on("input",function(event){onInput(event)});
    row.append(textArea);

    var fromStorage = localStorage.getItem(i);
    if(fromStorage){
        textArea.val(fromStorage);
    }

    var saveButton = $("<button>");
    saveButton.addClass("col-1");
    saveButton.addClass("saveBtn");
    saveButton.text("Save");
    saveButton.attr("data-hour", i);
    saveButton.on("click", onSaveClick);
    row.append(saveButton);

    container.append(row);
}