import {ServiceProvider} from "tsframework-full/build/Core/ServiceProvider";
import {Router} from "tsframework-full/build/Index";
import {TestMiddleware} from "./controllers/TestMiddleware";
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
        router.get("/test", IndexController, "getIndex").middleware(TestMiddleware);
        console.log(container.resolve("Router").printRoutes());
    }

}
