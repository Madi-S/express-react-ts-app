import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { hash } from 'bcryptjs'
import { User } from './entity/User'

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'Hi!'
    }

    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string
    ) {
        const hashedPassword = await hash(password, 12)

        try {
            await User.insert({
                email,
                password: hashedPassword
            })
        } catch (err) {
            console.log('Error:', err)
            return false
        }

        return true
    }
}
