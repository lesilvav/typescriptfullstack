import * as express from "express";
import * as mongodb from "mongodb";
import * as bodyParser from "body-parser";

import { initializeDatabase } from "./db/db";

import { FriendsRepository } from "./friend/friends-repository";
import { FriendsController } from "./friend/friends-controller";

import { UsersRepository } from "./session/users-repository";
import { LoginController } from "./session/login-controller";

var app = express();
app.use(bodyParser.json());

initializeDatabase((error: mongodb.MongoError, database: mongodb.Db) => {

  if(error){
    console.error(error);
    return;
  }

  console.log("Database initialized");

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
    initializeControllers(database, app);
  });

});

function initializeControllers(database: mongodb.Db, app: express.Express){
  var friendsRepository = new FriendsRepository(database)
  var friendsController = new FriendsController(app, friendsRepository);
  friendsController.initialize();
  
  var usersRepository = new UsersRepository(database)
  var loginController = new LoginController(app, usersRepository);
  loginController.initialize();
}