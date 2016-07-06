import {Application} from "tsframework-full";

let services = [
    "Core/TSFWServiceProvider.js",
    "Configuration/ConfigurationServiceProvider.js",
    "Controller/ControllerServiceProvider.js",
    "Http/HttpServiceProvider.js",
    "View/ViewServiceProvider.js"
];

let app: Application = new Application(process.cwd(), services);
    app.start();