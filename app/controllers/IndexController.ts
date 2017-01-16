import {HttpController, Inject} from "tsframework-full";

export class IndexController extends HttpController
{
    public getIndex()
    {
        return this.view('welcome.ejs');
    }
}