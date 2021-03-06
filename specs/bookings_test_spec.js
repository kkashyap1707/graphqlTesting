
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL BOOKINGS API queries', function () {

    var chefBookings,createBooking,createInProgressBooking,markBookingAsCompleted,reserveChefSlot,updateBooking,updateInProgressBooking,userBookings ;
    var bookingID,newBookingID,updatedNewBookingID;

    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            chefBookings =  "query { chefBookings(chefId: \"" + global.userID + "\", status: INCOMPLETE, cursor: null, pageSize: 6,startDate: \"2018-08-13\", numWeeks:15) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore} }";
            createInProgressBooking = "mutation { createInProgressBooking(booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", date: \"2018-08-13\", timeSlot: { start: \"11:00\", end: \"13:00\"}, dishes: [{ dishId: \"e9021266-cfca-4e44-b3f6-70edc46ed5d4\", serves: 4 }] ,  equipmentsPresent: [\"Microwave Oven\", \"Grill\", \"Gas\"], cardId: \"" + global.cardID + "\",   }) }";
            createBooking = "mutation { createBooking(bookingId: \""+ newBookingID +"\" ) }";
            markBookingAsCompleted = "mutation { markBookingAsCompleted(id: \"" + global.userID + "\", bookingId: \"a52fe6c8-1ad9-42b2-b9bb-549cc608fa38\") }";
            reserveChefSlot = "mutation { reserveChefSlot(chefId: \"" + global.userID + "\", userId: \"" + global.userID + "\", day: \"2018-08-13\", slot: {start: \"11:30\", end: \"14:00\"}) }";
            updateBooking = "mutation { updateBooking(bookingId: \"75c18880-7fc9-42ce-a498-f9695134cd5e\", status: COMPLETED ) }";
            updateInProgressBooking = "mutation { updateInProgressBooking(bookingId: \""+ newBookingID +"\", booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", cardId: \"" + global.cardID + "\",   }) }";
            userBookings = "query { userBookings(userId: \"" + global.userID + "\", status: INCOMPLETE, cursor: null, pageSize: 6) {bookings{ id chefId  date   chefReviewId } endCursor hasMore} }";

            done();

        } else {
            done();
        }
    });

    it('ZESTY_BOOKINGS-001 : Create In Progress Booking api', function (done) {

        helperUtil.addStep("Request Payload :: "+createInProgressBooking);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createInProgressBooking}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            bookingID = response.data.createInProgressBooking;
            console.log("New Booking ID :: "+bookingID);
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_BOOKINGS-002 : Update In Progress Booking api', function (done) {

        console.log("Booking ID :: "+bookingID);

        newBookingID = bookingID;

        updateInProgressBooking = "mutation { updateInProgressBooking(bookingId: \""+ newBookingID +"\", booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", cardId: \"" + global.cardID + "\",   }) }";

        console.log(">>>>>>>>>>"+updateInProgressBooking);
        helperUtil.addStep("Request Payload :: "+updateInProgressBooking);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateInProgressBooking}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
            done();
        }).catch(err => {
            //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
            done(err);
        });
    });

    it('ZESTY_BOOKINGS-003 : Create Booking api', function (done) {

        helperUtil.addStep("Booking ID :: "+bookingID);

        newBookingID = bookingID;

        helperUtil.addStep("New Booking ID :: >>>>>>>>>>>>>>>>>"+newBookingID);

        createBooking = "mutation { createBooking(bookingId: \""+ newBookingID +"\" ) }";


        helperUtil.addStep("Create booking :: <<<<<<<<<<<<<<<<<<<<<HOLA >>>"+createBooking);

        helperUtil.addStep("Request Payload :: "+createBooking);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createBooking}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
            done();
        }).catch(err => {
            //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
            done(err);
        });
    });

    it('ZESTY_BOOKINGS-004 : Update Booking api', function (done) {

        helperUtil.addStep("Request Payload :: "+updateBooking);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateBooking}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_BOOKINGS-005 : Mark Booking As Complete api', function (done) {

        helperUtil.addStep("Request Payload :: "+markBookingAsCompleted);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: markBookingAsCompleted}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_BOOKINGS-006 : Reserve Chef Slot api', function (done) {

        helperUtil.addStep("Request Payload :: "+reserveChefSlot);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: reserveChefSlot}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_BOOKINGS-007 : Chef Booking api', function (done) {

        helperUtil.addStep("Request Payload :: "+chefBookings);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: chefBookings}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_BOOKINGS-008 : User Booking api', function (done) {

        helperUtil.addStep("Request Payload :: "+userBookings);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: userBookings}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });



});