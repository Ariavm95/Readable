'use strict';

var clone = require('clone');
var posts = require('./posts');

var db = {};

var defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
};

function getData(token) {
  var data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getByParent(token, parentId) {
  return new Promise(function (res) {
    var comments = getData(token);
    var keys = Object.keys(comments);
    filtered_keys = keys.filter(function (key) {
      return comments[key].parentId === parentId && !comments[key].deleted;
    });
    res(filtered_keys.map(function (key) {
      return comments[key];
    }));
  });
}

function get(token, id) {
  return new Promise(function (res) {
    var comments = getData(token);
    res(comments[id].deleted || comments[id].parentDeleted ? {} : comments[id]);
  });
}

function add(token, comment) {
  return new Promise(function (res) {
    var comments = getData(token);

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    };

    posts.incrementCommentCounter(token, comment.parentId, 1);
    res(comments[comment.id]);
  });
}

function vote(token, id, option) {
  return new Promise(function (res) {
    var comments = getData(token);
    comment = comments[id];
    switch (option) {
      case "upVote":
        comment.voteScore = comment.voteScore + 1;
        break;
      case "downVote":
        comment.voteScore = comment.voteScore - 1;
        break;
      default:
        console.log('comments.vote received incorrect parameter: ' + option);
    }
    res(comment);
  });
}

function disableByParent(token, post) {
  return new Promise(function (res) {
    var comments = getData(token);
    keys = Object.keys(comments);
    filtered_keys = keys.filter(function (key) {
      return comments[key].parentId === post.id;
    });
    filtered_keys.forEach(function (key) {
      return comments[key].parentDeleted = true;
    });
    res(post);
  });
}

function disable(token, id) {
  return new Promise(function (res) {
    var comments = getData(token);
    comments[id].deleted = true;
    posts.incrementCommentCounter(token, comments[id].parentId, -1);
    res(comments[id]);
  });
}

function edit(token, id, comment) {
  return new Promise(function (res) {
    var comments = getData(token);
    for (prop in comment) {
      comments[id][prop] = comment[prop];
    }
    res(comments[id]);
  });
}

module.exports = {
  get: get,
  getByParent: getByParent,
  add: add,
  vote: vote,
  disableByParent: disableByParent,
  disable: disable,
  edit: edit
};
//# sourceMappingURL=comments.js.map