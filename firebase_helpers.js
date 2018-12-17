const firebase = require('firebase');
const database = require('./firebase');
const _ = require('lodash');
let issuesObj = {};
let filteredObj = {};
let filteredObj2 = {};
const ref = firebase.database().ref();
const getIssues = (req, res) => {
  return new Promise((resolve, reject) => {
    ref
      .once('value')
      .then(snapshot => {
        _.assign(issuesObj, snapshot.val());
        resolve(issuesObj);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getFilteredIssues = params => {
  filteredObj2 = {};
  return new Promise((resolve, reject) => {
    getIssues().then(res => {
      new Promise((resolve, reject) => {
        Object.keys(res.issues).map(key => {
          res.issues[key].tags.forEach(str => {
            if (
              str
                .toString()
                .trim()
                .toLowerCase()
                .indexOf(
                  params
                    .toString()
                    .trim()
                    .toLowerCase()
                ) != -1
            ) {
              return (filteredObj2 = _.assign({
                ...filteredObj2,
                [key]: res.issues[key]
              }));
            }
          });
        }),
          resolve(filteredObj2);
      }).then(data => {
        resolve(data);
      });
    });
  });
};

module.exports.getIssues = getIssues;
module.exports.getFilteredIssues = getFilteredIssues;
