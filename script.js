var container = $(".container");

function onRowClick(event){
    var target = $(event.target);
    if (target.hasClass("saveBtn")){
        var row = target.parent();
        var hour = row.attr("data-hour");
        var textArea = row.find(".entryField");
        localStorage.setItem(hour, textArea.val());
    }
}

//todo: see if there's a better way to do this, feels hacked together.
function getCurrentRelation(eventHour){
    if (moment().isBetween(moment(eventHour), moment(eventHour).add(1,"hours"))){
        return "present";
    }
    return moment().isAfter(moment(eventHour)) ? "past" : "future";
}

for(var i = 9; i < 18; i++){

    var eventHour = moment(i, ["H"]);
    var row = $("<div>");
    row.addClass("row");
    row.attr("data-hour", eventHour.format("h A"));
    row.on("click", onRowClick);

    var timeColumn = $("<div>");
    timeColumn.addClass("col-1")
    timeColumn.addClass("hour");
    timeColumn.text(eventHour.format("h A"));
    row.append(timeColumn);

    var timeRelation = getCurrentRelation(eventHour);

    var eventsColumn = $("<div>");
    eventsColumn.addClass("col-10")
    eventsColumn.addClass("eventsColumn");
    eventsColumn.addClass(timeRelation);
    row.append(eventsColumn);

    var entryField = $("<textarea>");
    entryField.addClass("entryField");
    eventsColumn.append(entryField);

    var saveColumn = $("<div>");
    saveColumn.addClass("col-1")
    saveColumn.addClass("timeColumn");
    saveColumn.addClass("saveBtn")
    saveColumn.text("Save");
    row.append(saveColumn);

    container.append(row);
    
}