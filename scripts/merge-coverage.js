var istanbul = require('istanbul');
var path = require('path');
var fs = require('fs');

var collector = new istanbul.Collector();

var file = path.join(__dirname, '..', 'coverage-unit', 'coverage.json');
collector.add(JSON.parse(fs.readFileSync(file, 'utf8')));

file = path.join(__dirname, '..', 'coverage-bdd', 'coverage.json');
collector.add(JSON.parse(fs.readFileSync(file, 'utf8')));

['lcov', 'json'].forEach(function(type) {
    var report = istanbul.Report.create(type, {
        dir: path.join(__dirname, '..', 'coverage')
    });
    report.writeReport(collector, true);
});
