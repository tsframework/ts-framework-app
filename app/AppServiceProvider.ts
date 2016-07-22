import {ServiceProvider} from "tsframework-full/build/Core/ServiceProvider";
import {FactoryMethod} from "huject";
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
    }

}
