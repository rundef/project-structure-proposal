if(process.argv.length < 5) {
  console.log('Usage: import-from-testrails.js <url> <username> <password>');
  process.exit(1);
}

var Testrail = require("testrail-api");
var async = require("async");
var S = require("string");
var chalk = require("chalk");

var testrail = new Testrail({
  host: process.argv[2],
  user: process.argv[3],
  password: process.argv[4]
});

// ssense
PROJECT_ID = 3;

// master
SUITE_ID = 33;

// Images in HQM are cloudinary
SECTION_ID = 317;

async.waterfall([
  /*
  function (next) {
    testrail.getProjects(next);
  },

  function (projects, next) {
    console.log('projects', projects);
    next();
  },
  */

  /*
  function (next) {
    testrail.getSuites(3, next);
  },

  function (suites, next) {
    console.log('suites', suites);
    next();
  },
  */

  /*
  function (next) {
    testrail.getSections(PROJECT_ID, {suite_id: SUITE_ID}, next);
  },

  function (sections, next) {
    console.log('sections', sections);
    next();
  },
  */

  function (next) {
    console.log(chalk.green('Syncing with TestRail ...'));
    console.log('');

    testrail.getCases(PROJECT_ID, {suite_id: SUITE_ID, section_id: SECTION_ID }, next);
  },

  function (cases, next) {
    for(var i = 0; i < cases.length; i++) {
      var filename = cases[i].id + '-' + S(cases[i].title).slugify().s + '.feature';

      console.log(' ' + chalk.red(filename));
      var lines = cases[i].custom_gherkin.split('\n');
      for(var j = 0; j < lines.length; j++) {
        console.log('  ' + chalk.yellow(lines[j]));
      }
      console.log('');
    }

    next();
  },
], function(err) {
  if(err) {
    console.log('error', err);
  }
});

