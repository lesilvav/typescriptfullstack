import { FriendsRepository } from "./friends-repository";
import * as express from "Express";

export class FriendsController {
    constructor(
        private app: express.Express,
        private repository: FriendsRepository
    ){
    }
    
    
    public initialize(){

        this.app.get("/friends", async (req: express.Request, res: express.Response) => {
            var repo = this.repository;
            var friends = await repo.getFriends(req.query);

            res.send(friends);
        })
    }
}