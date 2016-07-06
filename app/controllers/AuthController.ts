import {HttpController, action} from "tsframework-full";

export class AuthController extends HttpController
{
    // GET: /auth
    @action({'path': '/'})
    public index()
    {
        return this.content("Auth");
    }

    // POST: /auth/login
    @action({'path': '/login', 'method': ['POST']})
    public login(username: string, password: string)
    {
        if (username === "foo" && password === "bar") {
            this.redirect("/success");
        } else {
            this.redirect("/error");
        }
    }

    // POST: /auth/logout
    @action({path: '/logout'})
    public logout(token: string)
    {
        this.content("logout");
    }
}