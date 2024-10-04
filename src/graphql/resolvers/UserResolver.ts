import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from 'src/__mocks__/mockUsers';
import { UserSettings } from '../models/UserSettings';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';

export let incrementalId = 3;

@Resolver(of => User)
export class UserResolver { 
    @Query(() => User,{nullable:true })
    getUserById(@Args('id',{type:()=>Int,nullable:true}) id:number): User { 
        return  mockUsers.find(user => user.id === id);
    }

    @Query(() => [User])
    getUsers(): User[] { 
        return mockUsers;
    }
 
    @ResolveField(()=>UserSettings,{name:'settings',nullable:true})
    getUserSettings(@Parent() user:User): UserSettings { 
        return mockUserSettings.find(setting => setting.userId === user.id);

    }

    @Mutation(()=>User)
    createUser(@Args('username') username:string,@Args('displayName',{nullable:true}) displayName:string){
        const newUser = {id:++incrementalId,username,displayName};
        incrementalId++;
        mockUsers.push(newUser);
        return newUser;
    }
}


