import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserSettings{

    @Field(()=>Int)
    userId:number;

    @Field({defaultValue:false })
    receivedNotifications:boolean;

    @Field({defaultValue:false })
    receivedEmails:boolean;
 
}