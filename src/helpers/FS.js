let path      = require('path');
let fs        = require('graceful-fs');


class FSHelper {
  loadFiles(directory) {
    let modules = {};

    let files = fs.readdirSync(directory);
    for(let file of files) {
      let extension = path.extname(file);
      let basename = path.basename(file, extension);

      modules[basename] = require(`${directory}/${basename}`);
    }

    return modules;
  }
}

module.exports = FSHelper;
