import { PrismaClient, User } from "@prisma/client"

type Context = {
    loggedInUser? : User; //loggedInUser는 필수 조건이 아님
    client: PrismaClient
}

export type Resolver = (root:any, args:any, context:Context, info:any) => any

export type Resolvers = {
    [key:string]: {
        [key: string]: Resolver
    }
}