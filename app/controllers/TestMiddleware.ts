export class TestMiddleware {

    private test;

    public constructor() {
        this.test = 0;
    }

    public before(request, response, next, send) {
        this.test++;
        console.log("before! "+this.test);
        next();
    }

    public after(request, response, send) {
        this.test++;
        console.log("after "+this.test);
        send();
    }

}