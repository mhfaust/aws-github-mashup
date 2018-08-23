const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


module.exports = function (fakeResponseFile, callback, missingFakeErrorMessage, service) {

  fs.readFile(path.resolve('./__mocks__/' + service + 'Fakes/' + fakeResponseFile), 'utf8', (err, data) => {
    if(err) {
      if(err.message.includes('no such file or directory'))
        console.log(chalk.red("MISSING FAKE ERROR: " + missingFakeErrorMessage))
      callback(err);
    } else {
      callback(null, JSON.parse(data));
    }
  });
}  
