import { Entity, PrimaryGeneratedColumn, Column, InsertEvent, EventSubscriber, EntitySubscriberInterface, UpdateEvent } from "typeorm"
import {isEmail, IsEmail, IsNotEmpty, validate, ValidationError} from "class-validator"
import { UniqueColumn } from "./Decorator"

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

    @Column({unique: true})
    @IsNotEmpty()
    @UniqueColumn('email', {
        message:'email should not be duplicate',
      })
    email!: string

    @Column()
    @IsNotEmpty()
    passwordHash!: string
}

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

        /**
     * Indicates that this subscriber only listen to Post events.
     */
        listenTo() {
            return User
        }

    async beforeInsert(event: InsertEvent<User>) {
        console.log(`BEFORE POST INSERTED: `, event.entity)
        const errors = await validate(event.entity)
        if (errors.length) {
            const error = new ValidationError()
            error.target=event.entity
            error.property = 'email'
            error.constraints= { isNotEmpty: 'email should not be empty' }
            throw error
        }
        
    }

    /*async beforeUpdate(event: UpdateEvent<User>) {
        console.log(`BEFORE POST UPDATED: `, event.databaseEntity)
        const errors = await validate(event.databaseEntity)
        if (errors.length) {
            const error = new ValidationError()
            error.target=event.entity
            error.property = 'email'
            error.constraints= { isNotEmpty: 'email should not be empty' }
            throw error
        }
        
    }*/
}