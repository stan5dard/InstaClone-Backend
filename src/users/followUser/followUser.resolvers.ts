import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers : Resolvers = {
    Mutation:{
        followUser: protectedResolver(
            async(_, {username}, {loggedInUser}) => {
                const ok = await client.user.findUnique({where:{username:username}})
                //유저가 존재하는지부터 체크
                if(!ok){
                    return{
                        ok: false,
                        error: "user not exist, can't follow"
                    }
                }
                // self referencing으로 처리
                await client.user.update({
                    where:{
                        id: loggedInUser.id,
                    },
                    data:{
                        following:{
                            connect:{
                                username: username,
                            }
                        },
                    }
                })
                return{
                    ok: true,
                }
            }
        )
    }
}

export default resolvers