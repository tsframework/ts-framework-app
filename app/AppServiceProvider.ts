import {ServiceProvider} from "tsframework-full/build/Core/ServiceProvider";
import {Router} from "tsframework-full/build/Index";
import {IndexController} from "./controllers/IndexController";

/**
 *
 */
export class AppServiceProvider extends ServiceProvider {

    boot(container:Huject.Container) {
        //Register all your custom classes to the container?
    }

    start(container:Huject.Container) {
        //Start all you custom components
        //Register your events listeners
        var router: Router = container.resolve("Router");
        router.get("/", IndexController, "getIndex");
        console.log(container.resolve("Router").printRoutes());
    }

}
