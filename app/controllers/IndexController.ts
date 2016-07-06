import {HttpController, action, controller} from "tsframework-full";

@controller()
export class IndexController extends HttpController
{
    // GET: /
    @action({path:'/'})
    public getIndex()
    {
        return this.view('welcome.ejs');
    }

    @action({path: '/download'})
    public getDownload()
    {
        return this.download('somefile.dat');
    }
}