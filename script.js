var container = $(".container");

function onRowClick(event){
    var target = $(event.target)
    var hour = target.parent().attr("data-hour");
    console.log(hour);
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
    console.log(eventHour);
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

    var saveColumn = $("<div>");
    saveColumn.addClass("col-1")
    saveColumn.addClass("timeColumn");
    saveColumn.addClass("saveBtn")
    row.append(saveColumn);

    container.append(row);
    
}