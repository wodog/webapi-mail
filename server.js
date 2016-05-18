"use strict";
/**
 * Dependencies
 */
const fs = require("fs");
const koa = require("koa");
const mongoose = require("mongoose");

/**
 * Config
 */
const config = require("./config/config");

/**
 * Connect to database
 */
mongoose.connect(config.mongo.url);
mongoose.connection.on("error", function(err) {
    console.log(err);
    process.exit(1);
});

/**
 * Load the models
 */
const modelsPath = config.app.root + "/src/models";
fs.readdirSync(modelsPath).forEach(function(file) {
    if (~file.indexOf("js")) {
        require(modelsPath + "/" + file);
    }
});

/**
 * Server
 */
const app = module.exports = koa();


require("./config/koa")(app, config);

// Routes
require("./config/routes")(app);

// Start app
if (!module.parent) {
    app.listen(config.app.port);
    console.log("Server started, listening on port: " + config.app.port);
}
console.log("Environment: " + config.app.env);
