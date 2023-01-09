import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, UpdateEvent, InsertEvent, getMetadataArgsStorage } from "typeorm"
import { ValidationError } from "./ValidationError"
import {IsEmail, IsNotEmpty, validate} from "class-validator"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column()
    @IsNotEmpty()
    firstname!: string

    @Column() 
    @IsNotEmpty()
    lastname!: string

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email!: string

    @Column()
    @IsNotEmpty()
    passwordHash!: string

    /*@BeforeUpdate()
    validatePresenceOfProperties(){
        for(const column of getMetadataArgsStorage().columns){
            if(column.target!==this.constructor) continue
            if(column.options.nullable) continue

            const columnName = column.propertyName as keyof User
            if(this[columnName]==null || this[columnName]===''){
                throw new ValidationError('The email is required', this, columnName)
            }
        }
    }*/

        //tentative exo 3
        /*validationError(user: User){
        if(!this.email || this.email==""){
            throw new ValidationError('email manquant', user, this.email)
        }
        if(!this.firstname || this.firstname==""){
            throw new ValidationError('firstname manquant', user, this.firstname)
        }
        if(!this.lastname || this.lastname==""){
            throw new ValidationError('lastname manquant', user, this.lastname)
        }
        if(!this.passwordHash || this.passwordHash==""){
            throw new ValidationError('password manquant', user, this.passwordHash)
        }
    }

    @BeforeInsert()
    beforeInsert(event: InsertEvent<User>){
        this.validationError(event.entity)
    }
    beforeUpdate(event: UpdateEvent<User>){
    }*/

    /*@BeforeInsert()
    checkEmailIsNotEmpty(){
        if(!this.email || this.email=="" || this.email==undefined){
            throw new ValidationError('The email is required', this, "email")
        }
    }*/
}

export class subscribers{

    const errors = await validate(user)
    if (errors.length) throw new Error(`Validation failed!`)
}