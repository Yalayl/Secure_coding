import { Entity, PrimaryGeneratedColumn, Column, InsertEvent, EventSubscriber, EntitySubscriberInterface } from "typeorm"
import {IsEmail, IsNotEmpty, validate, ValidationError} from "class-validator"

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
        console.log(errors)
        if (errors.length) {
            const error = new ValidationError()
            error.target=event.entity
            error.property = 'email'
            error.constraints= { isNotEmpty: 'email should not be empty' }
            throw error
        }
        
    }
}