
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL SCHEDULE API queries', function () {

    var createPost,deletePost,featuredPosts,getPostById,posts,updatePost;

    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            createPost = "mutation { createPost( post: { chefId : \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", title : \"Fungee1\", body : \"Laborum ad occaecat dolore fugiat id. Lorem officia irure mollit adipisicing laborum voluptate exercitation voluptate fugiat in proident. Culpa anim laboris nulla id reprehenderit esse cillum voluptate consequat quis. Laborum incididunt voluptate reprehenderit sunt sit sunt aliqua in minim elit.\",  tags: [ \"Fungee\" , \"Wiener Schnitzel\", \"Bermuda fish chowder\" ], media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" } ], isDraft:false }) }";
            deletePost = "mutation { deletePost(id: \"9c3e90c2-934a-409b-94d0-2d7f0c5d6c3e\") }";
            featuredPosts = "query {featuredPosts(postCount: 10) {id chefId title blurb body isDraft tags numOfLikes media{ type url }}}";
            getPostById = "query {post(id: \"59d5e543-296e-4432-a42e-02303f676f8c\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";
            posts = "query {posts(filters: { title: \"furnance\", isDraft: false, tags:[\"Chinese\"] }, cursor: null, pageSize: 6)} { posts{id chefId title blurb body isDraft tags numOfLikes media{ type url }} endCursor hasMore }";
            updatePost = "mutation { updatePost( post: { id: \"9c3e90c2-934a-409b-94d0-2d7f0c5d6c3e\", title : \"Fungee1\", body : \"Laborum ad occaecat dolore fugiat id. Lorem officia irure mollit adipisicing laborum voluptate exercitation voluptate fugiat in proident. Culpa anim laboris nulla id reprehenderit esse cillum voluptate consequat quis. Laborum incididunt voluptate reprehenderit sunt sit sunt aliqua in minim elit.\",  tags: [ \"Fungee\" , \"Wiener Schnitzel\", \"Bermuda fish chowder\" ], isDraft:false }) }";

            done();

        } else {
            done();
        }
    });

    it('ZESTY_POST-001 :Create Post api', function (done) {

        helperUtil.addStep("Request Payload :: "+createPost);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createPost}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_POST-002 :Delete Post api', function (done) {

        helperUtil.addStep("Request Payload :: "+deletePost);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: deletePost}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_POST-003 :Featured Post api', function (done) {

        helperUtil.addStep("Request Payload :: "+featuredPosts);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: featuredPosts}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_POST-004 :Get Post By ID api', function (done) {

        helperUtil.addStep("Request Payload :: "+getPostById);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: getPostById}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_POST-005 :Posts api', function (done) {

        helperUtil.addStep("Request Payload :: "+posts);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: posts}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_POST-006 :Update Post api', function (done) {

        helperUtil.addStep("Request Payload :: "+updatePost);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updatePost}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


});