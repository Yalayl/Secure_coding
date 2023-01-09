import { User } from "./user";

export class ValidationError<T> extends Error {

    constructor(message: string, public target: T, public property: keyof T){
        super(message)
        this.name="validation error"
    }

    /*constructor(message: string, public target: User, public property: string){
        super(message)
        this.name="validation error"
    }*/
    


}

