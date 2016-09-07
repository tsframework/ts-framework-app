import {HttpController, action, controller, middleware} from "tsframework-full";

@controller({middleware: ["TestClassMiddle"]})
export class IndexController extends HttpController
{
    // GET: /
    @action({path:'/', middleware: ["TestMethodMiddle"]})
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