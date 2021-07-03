import {
    Arg,
    Mutation,
    Query,
    Resolver,
    Field,
    ObjectType,
    Ctx,
    UseMiddleware
} from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { User } from './entity/User'
import { MyContext } from './MyContext'
import { createAccessToken, createRefreshToken } from './auth'

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'Hi!'
    }

    @Query(() => String)
    @UseMiddleware()
    bye() {
        return 'Bye!'
    }

    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw new Error('User does not exist with given email')
        }

        const valid = await compare(password, user.password)
        if (!valid) {
            throw new Error('Incorrect credentials')
        }

        // succesfful login -> provide token

        res.cookie('jid', createRefreshToken(user), {
            httpOnly: true
        })

        return {
            accessToken: createAccessToken(user)
        }
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
