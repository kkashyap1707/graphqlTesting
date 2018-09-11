
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL LOGIN API queries', function () {

    var login;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            login = "mutation { login(id: \"shanky.kalra@wikfur.com\", pwd: \"RT123@11\" ) }";


            done();

        } else {
            done();
        }
    });

    it('ZESTY_LOGIN-001 :Login api', function (done) {

        helperUtil.addStep("Request Payload :: "+login);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query: login}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


});