import { FriendsRepository } from "./friends-repository";
import * as express from "Express";
import * as _ from "lodash";
import {Buddy} from "./friend";

export class FriendsController {
    constructor(
        private app: express.Express,
        private repository: FriendsRepository
    ){
    }
    
    
    public initialize(){

        this.app.get("/api/friends", async (req: express.Request, res: express.Response) => {
            var repo = this.repository;
            var friends = await repo.find(req.query);

            res.send(friends.map((friend) => { 
                return friend.toJson()
            }));
        })
        
        this.app.post("/api/friends", async (req: express.Request, res: express.Response) => {
            var repo = this.repository;
            var friend = new Buddy(repo, req.body);
            await friend.save();
            
            res.send(friend.toJson());
        })
        
        this.app.put("/api/friends", async (req: express.Request, res: express.Response) => {
            var repo = this.repository;
            var toUpdate = await repo.findOne(req.query);
            if(toUpdate){
                _.assign(toUpdate, req.body);
                var response = await repo.updateOne(toUpdate);
            }
            
            res.send(response.toJson());
        })
    }
}