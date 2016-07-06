import {HttpController, action, controller} from "tsframework-full";

export class ShopController extends HttpController
{
    // GET: /shop
    @action()
    public index()
    {
        this.content("Hello");
    }

    // GET: /shop/product/:id
    @action({'path': '/product/:id'})
    public product()
    {
        this.json({
            "id": this.request.params().id || 0
        });
    }
}