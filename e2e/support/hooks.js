"use strict";
const Cucumber = require("cucumber");
const {BeforeAll, After, Status} = require("cucumber");

BeforeAll({timeout: 10 * 1000}, function () {
  return browser.get('http://localhost:4200');
});

After(function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    const attach = this.attach; // cucumber's world object has attach function which should be used
    return browser.takeScreenshot().then(function (png) {
      const decodedImage = new Buffer(png, "base64");
      return attach(decodedImage, "image/png");
    });
  }
});


