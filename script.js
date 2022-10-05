var container = $(".container");

function onRowClick(event){
    var target = $(event.target)
    var hour = target.parent().attr("data-hour");
    console.log(hour);
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
    row.append(timeColumn);

    // var relative;

    // var now = moment().get("hour");
    // var relative = moment(now).from(eventHour);

    // console.log(relative);

    var eventsColumn = $("<div>");
    eventsColumn.addClass("col-10")
    eventsColumn.addClass("eventsColumn");
    row.append(eventsColumn);

    var saveColumn = $("<div>");
    saveColumn.addClass("col-1")
    saveColumn.addClass("timeColumn");
    saveColumn.addClass("saveBtn")
    row.append(saveColumn);

    container.append(row);
    
}