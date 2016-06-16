if(process.argv.length < 5) {
  console.log('Usage: import-from-testrails.js <url> <username> <password>');
  process.exit(1);
}

var Testrail = require("testrail-api");
var async = require("async");

var testrail = new Testrail({
  host: process.argv[2],
  user: process.argv[3],
  password: process.argv[4]
});


async.waterfall([
  function (next) {
    testrail.getProjects(next);
  },

  function (projects, next) {
    console.log('projects', projects);
    next();
  },

  function (next) {
    testrail.getSuites(3, next);
  },

  function (suites, next) {
    console.log('suites', suites);
    next();
  },

  function (next) {
    testrail.getSections(3, {suite_id: 33}, next);
  },

  function (sections, next) {
    console.log('sections', sections);
    next();
  },

  function (next) {
    testrail.getCases(3, {suite_id: 33, section_id:317 }, next);
  },

  function (cases, next) {
    for(var i = 0; i < cases.length; i++) {
      console.log(cases[i]);
        console.log(cases[i].custom_gherkin);
        console.log('-----------');
    }

    next();
  },
], function(err) {
  if(err) {
    console.log('error', err);
  }
});

