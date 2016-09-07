import {Application} from "tsframework-full";

let services = [
    "Core/TSFWServiceProvider.js",
    "Configuration/ConfigurationServiceProvider.js",
    "Http/HttpServiceProvider.js",
    "Router/RouterServiceProvider.js",
    "Controller/ControllerServiceProvider.js",
    "View/ViewServiceProvider.js",
    "AppServiceProvider.js"
];

let app: Application = new Application(process.cwd(), services);
    app.start();