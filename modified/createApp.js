function createApp() {
    var app = connect();
    var prefix = process.env.URL_PREFIX || '';

    return app.use(function(req, res, next) {
        // Handle prefix
        if (prefix && req.url.startsWith(prefix)) {
            req.originalUrl = req.url;
            req.url = req.url.slice(prefix.length) || '/';
        }

        util._extend(req, url.parse(req.url, true));
        if (EngineFS.loggingEnabled) {
            console.log("-> " + req.method + " " + (req.originalUrl || req.url) + " " + (req.headers.range || ""));
        }
        next();
    }), app.use(bodyParser.json({
        limit: "3mb"
    })), app.use(bodyParser.urlencoded({
        extended: true
    })), app.use(externalRouter), app.use(router), app;
}
