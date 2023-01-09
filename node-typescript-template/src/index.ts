import "reflect-metadata"
import { User } from "./entities/user"
import { AppDataSource } from "./lib/typeorm"

console.log('hello world')


AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
    


