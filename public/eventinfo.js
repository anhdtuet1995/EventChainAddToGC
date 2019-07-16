class EventInfo {
	constructor(id, name, location, organizer, dateFrom, dateTo, image, url) {
		this.id = id;
		this.name = name;
		this.location =  location;
		this.organizer =  organizer;
		this.dateFrom =  dateFrom;
		this.dateTo =  dateTo;
		this.image =  image;
		this.url =  url;
	}

	createEventInfoElement(no) {
		var tr = document.createElement("tr");
		var thNo = document.createElement("th");
		thNo.innerHTML = no;
		var trEventName = document.createElement("td");
		trEventName.innerHTML = this.name;
		var trOrganizer = document.createElement("td");
		trOrganizer.innerHTML = this.organizer;
		var trDateFrom = document.createElement("td");
		trDateFrom.innerHTML = this.dateFrom;
		var trLocation = document.createElement("td");
		trLocation.innerHTML = this.location;
		var trButton = document.createElement("td");
		var addButton = document.createElement("button");
		addButton.classList.add("btn");
		addButton.classList.add("btn-primary");
		addButton.setAttribute('onclick', "addButtonCallBack(\"" + this.id + "\")");
		addButton.innerHTML = "Add";
		trButton.appendChild(addButton);
		tr.appendChild(thNo);
		tr.appendChild(trEventName);
		tr.appendChild(trOrganizer);
		tr.appendChild(trDateFrom);
		tr.appendChild(trLocation);
		tr.appendChild(trButton);
		return tr;
	}
}