
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL SCHEDULE API queries', function () {

    var chefDaySchedule,chefWeeklySchedule,createDaySchedule,createWeeklySchedule,updateDaySchedule,updateWeeklySchedule;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            chefDaySchedule = "query {chefDaySchedule(chefId: \"64f3c481-0129-4af4-b35f-c9e9cf53f042\", date: \"2018-08-10\") { date available slots{start end} }}";
            chefWeeklySchedule = "query {chefSchedule(chefId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\") { daySchedules{ day slots{start end} } }}";
            createDaySchedule = "mutation { createDaySchedule(chefId: \"faa4d99e-301e-473e-ad71-99d8b0636868\", date: \"2018-08-10\", dateSchedule: { date: \"2018-08-13\", available: true, slots: [{ start: \"10:00\", end: \"15:00\" }] }) }";
            createWeeklySchedule = "mutation { createSchedule(chefId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", weekschedule: { daySchedules: [{day: MONDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]}, {day: TUESDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]}, {day: WEDNESDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]} ] }) }";
            updateDaySchedule = "mutation { updateDaySchedule(chefId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", date: \"2018-08-10\", dateSchedule: { date: \"2018-08-10\", available: true, slots: [{ start: \"10:00\", end: \"14:30\" }] }) }";
            updateWeeklySchedule = "mutation { updateSchedule(chefId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", weekschedule: { daySchedules: [{day: MONDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]}, {day: TUESDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]}, {day: THURSDAY, slots: [{ start: \"11:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]} ] }) }";

            done();

        } else {
            done();
        }
    });

    it('ZESTY_SCHEDULE-001 :Chef Day Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+chefDaySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: chefDaySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_SCHEDULE-002 :Chef Weekly Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+chefWeeklySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: chefWeeklySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_SCHEDULE-003 :Create Day Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+createDaySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createDaySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_SCHEDULE-004 :Create Weekly Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+createWeeklySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createWeeklySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_SCHEDULE-005 :Update Day Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+updateDaySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateDaySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_SCHEDULE-006 :Update Weely Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+updateWeeklySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateWeeklySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


});