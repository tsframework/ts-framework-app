import {Application} from "tsframework-full";

let services = [
    "Core/TSFWServiceProvider.js",
    "Configuration/ConfigurationServiceProvider.js",
    "Lang/LangServiceProvider.js",
    "Http/HttpServiceProvider.js",
    "View/ViewServiceProvider.js",

    "AppServiceProvider.js",
];

let app: Application = new Application(process.cwd(), services);
    app.start();