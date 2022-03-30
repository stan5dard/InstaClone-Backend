import client from "../../client";
import { Resolvers } from "../../types";

const resolvers : Resolvers = {
    Query:{
        //pagination으로 구현해보기
        searchUsers: async (_, {keyword, lastId}) =>{
            const users = await client.user.findMany({
                where:{
                    username:{
                        startsWith: keyword.toLowerCase(),
                    }
                },
                take: 5,
                skip: lastId? 1:0,
                ...(lastId && {cursor:{id: lastId}})
            })

            return users
        }
    }
}

export default resolvers