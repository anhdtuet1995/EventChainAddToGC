var tzMap = {
    "-11:00": "Pacific/Niue",
    "-10:00": "Pacific/Rarotonga",
    "-09:30": "Pacific/Marquesas",
    "-09:00": "Pacific/Gambier",
    "-08:00": "America/Anchorage",
    "-07:00": "America/Hermosillo",
    "-06:00": "America/Belize",
    "-05:00": "America/Eirunepe",
    "-04:00": "America/Boa_Vista",
    "-03:00": "America/Argentina/Buenos_Aires",
    "-02:30": "America/St_Johns",
    "-02:00": "America/Noronha",
    "-01:00": "Atlantic/Cape_Verde",
    "+00:00": "Atlantic/Azores",
    "+01:00": "Africa/Algiers",
    "+02:00": "Africa/Khartoum",
    "+03:00": "Asia/Baghdad",
    "+04:00": "Asia/Yerevan",
    "+04:30": "Asia/Kabul",
    "+05:00": "Indian/Kerguelen",
    "+05:30": "Asia/Colombo",
    "+05:45": "Asia/Kathmandu",
    "+06:00": "Asia/Dhaka",
    "+06:30": "Indian/Cocos",
    "+07:00": "Asia/Barnaul",
    "+08:00": "Antarctica/Casey",
    "+08:45": "Australia/Eucla",
    "+09:00": "Asia/Dili",
    "+09:30": "Australia/Darwin",
    "+10:00": "Australia/Brisbane",
    "+10:30": "Australia/Lord_Howe",
    "+11:00": "Pacific/Bougainville",
    "+12:00": "Asia/Anadyr",
    "+12:45": "Pacific/Chatham",
    "+13:00": "Pacific/Apia",
    "+14:00": "Pacific/Kiritimati",
}

function searchOnEventChain(keyWord, fromDate, toDate, location, eventchainSuccess, eventchainFailed) {
	var dateFiltering = "";
	if (fromDate) {
		dateFiltering += " DateFrom: \\\"" + fromDate + "\\\"\\n ";
	}
	else {
		dateFiltering += "";
	}

	if (toDate) {
		dateFiltering += " DateTo: \\\"" + toDate + "\\\"\\n ";
	}
	else {
		dateFiltering += "";
	}

	var settings = {
		url: 'https://api.eventchain.io/open',
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		data: "{\"query\":\"query{\\n        getEvents(\\n                    SearchParams:{\\n                        KeyWord: \\\"" + keyWord + "\\\"\\n     " + dateFiltering + "                 }\\n                )\\n                {\\n                    ID\\n                    CreateDate\\n                    CreateUserID\\n                    Status\\n                    TaxCalculationType\\n                    InWishList\\n                    BlockchainSecured\\n                    EventInfo {\\n                        Title\\n                        Host\\n                        StartDate\\n\\n                        EndDate: \\n\\n                        Description\\n                        EventImageURL\\n                        TimeZone {\\n                            TZoneID\\n                            FullName\\n                            Name\\n                        }\\n                    }\\n                    EventLocation {\\n                        VenueID\\n                        VenueName\\n                        DisplayMapOnEvent\\n                        Address {\\n                            Address1\\n                            Address2\\n                            City\\n                            CountryID\\n                            CountryName\\n                            ProvinceID\\n                            ProvinceName\\n                            PostalCode\\n                            MapCoords {\\n                                Lat\\n                                Long\\n                                Zoom\\n                            }\\n                        }\\n                    }\\n                    TicketTypes {\\n                        TicketTypeID\\n                        TypeName\\n                        EventID\\n                        Category\\n                        SeatingType\\n                        Price\\n                        Quantity\\n                        Description\\n                        Available\\n                        Currency\\n                        CurrencySign\\n                    }\\n                    ApplicableTaxes {\\n                        EventTaxID\\n                        TaxName\\n                        TaxPercent\\n                    }\\n                }\\n            }\"}",
	};
	console.log("Start searching on EventChain");
	console.log(settings);

	$.ajax(settings).done(function (response) {
		console.log(response);

		var events = response.data.getEvents;
		var result = [];
		for (var i = 0; i < events.length; i++) {
			var id = events[i].ID;
			var name = events[i].EventInfo.Title;

			var organizer = events[i].EventInfo.Host;
			var dateFrom = events[i].EventInfo.StartDate;
			var dateTo = events[i].EventInfo.EndDate;
			var imageUrl = events[i].EventInfo.EventImageURL;

			var addressObj = events[i].EventLocation.Address;

			var fullAddress = [addressObj.Address1, addressObj.Address2, addressObj.City, addressObj.ProvinceName, addressObj.CountryName].filter(Boolean).join(", ").toLowerCase();

			var locationName = [addressObj.City, addressObj.ProvinceName, addressObj.CountryName].filter(Boolean).join(", ");

			var url = "";

			if (fullAddress.includes(location.toLowerCase())) {
				let event = new EventInfo(id, name, locationName, organizer, dateFrom, dateTo, imageUrl, url);
				result.push(event);
			}
		}
		eventchainSuccess(result);
		console.log("Done");
	}).fail(function(error) {
		console.log(error);
		eventchainFailed(error);
	});

}

function queryOneEvent(eventId, eventchainSuccess, eventchainFailed) {

	var settings = {
		url: 'https://api.eventchain.io/open',
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		"data": "{\"query\":\"query{\\n\\t\\tgetEventDetails(EventID:\\\"" + eventId + "\\\") {\\n\\t\\tevent {\\n\\t\\t  ID\\n\\t\\t  CreateDate\\n\\t\\t  CreateUserID\\n\\t\\t\\tStatus\\n\\t\\t\\tPublishDate\\n\\t\\t  EventInfo {\\n\\t\\t\\tTitle\\n\\t\\t\\tvisibility\\n\\t\\t\\tOrganizerName\\n\\t\\t\\tOrganizerStatus\\n\\t\\t\\tOrganizerEmail\\n\\t\\t\\tOrganizerLogoLink\\n\\t\\t\\tHost\\n\\t\\t\\tStartDate\\n\\t\\t\\tEndDate\\n\\t\\t\\tTimeZone {\\n\\t\\t\\t  TZoneID\\n\\t\\t\\t  FullName\\n\\t\\t\\t  Name\\n\\t\\t\\t}\\n\\t\\t\\tDescription\\n\\t\\t\\tEventImageURL\\n\\t\\t  }\\n\\t\\t  EventLocation {\\n\\t\\t\\tVenueID\\n\\t\\t\\tVenueName\\n\\t\\t\\tAddress {\\n\\t\\t\\t  Address1\\n\\t\\t\\t  Address2\\n\\t\\t\\t  City\\n\\t\\t\\t  CountryID\\n\\t\\t\\t  CountryName\\n\\t\\t\\t  ProvinceID\\n\\t\\t\\t  ProvinceName\\n\\t\\t\\t  ProvinceShortName\\n\\t\\t\\t  PostalCode\\n\\t\\t\\t  MapCoords {\\n\\t\\t\\t\\tLat\\n\\t\\t\\t\\tLong\\n\\t\\t\\t\\tZoom\\n\\t\\t\\t  }\\n\\t\\t\\t}\\n\\t\\t\\tDisplayMapOnEvent\\n\\t\\t  }\\n\\t\\t  TicketTypes {\\n\\t\\t\\tTicketTypeID\\n\\t\\t\\tTypeName\\n\\t\\t\\tEventID\\n\\t\\t\\tCategory\\n\\t\\t\\tSeatingType\\n\\t\\t\\tPrice\\n\\t\\t\\tQuantity\\n\\t\\t\\tDescription\\n\\t\\t\\tAvailable\\n\\t\\t\\tCurrency\\n\\t\\t\\tCurrencySign\\n\\t\\t  }\\n\\t\\t  Currency {\\n\\t\\t\\tID\\n\\t\\t\\tName\\n\\t\\t\\tCode\\n\\t\\t\\tSymbol\\n\\t\\t\\tSupportedMethods\\n\\t\\t\\tZeroDecimal\\n\\t\\t\\tStripeCoef\\n\\t\\t\\tMinimumAmount\\n\\t\\t  }\\n\\t\\t  ApplicableTaxes {\\n\\t\\t\\tEventTaxID\\n\\t\\t\\tTaxName\\n\\t\\t\\tTaxPercent\\n\\t\\t\\tVendorTaxID\\n\\t\\t  }\\n\\t\\t  TaxCalculationType\\n\\t\\t  ReservationTimeout\\n\\t\\t  VendorID\\n\\t\\t  PastEvent\\n\\t\\t  InWishList\\n\\t\\t  BlockchainSecured\\n\\t\\t  RefundsAccepted\\n\\t\\t  RefundPolicy\\n\\t\\t  FeePercentage\\n\\t\\t  FeeFixedRate\\n\\t\\t  FeeCurrencyID\\n\\t\\t\\tFeePassedOn\\n\\t\\t\\tPromoCodeCount\\n\\t\\t}\\n\\t\\tstatusCode\\n\\t\\tmsg\\n\\t   }}\\n\\t\"}"
	}
	  
	$.ajax(settings).done(function (response) {
		console.log(response);
		var eventResponse = response.data.getEventDetails.event;
		var startDate = eventResponse.EventInfo.StartDate;
		var endDate = eventResponse.EventInfo.EndDate;
		var timeZone = startDate.substring(startDate.length - 6, startDate.length);
		console.log(timeZone);
		var eventInfo = {
			"title": eventResponse.EventInfo.Title,
			"start": new Date(startDate.substring(0, startDate.length - 6)),
			"end": new Date(endDate.substring(0, endDate.length - 6)),
			"ctz": tzMap[timeZone]
		};
		eventchainSuccess(eventInfo);
	}).fail(function (error) {
		eventchainFailed(error);
	});

}