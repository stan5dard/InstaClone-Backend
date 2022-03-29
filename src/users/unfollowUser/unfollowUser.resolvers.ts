import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers : Resolvers = {
    Mutation: {
        unfollowUser: protectedResolver(
            async(_, {username}, {loggedInUser}) => {
                const ok = await client.user.findUnique({where: {username: username}})
                if(!ok){
                    return{
                        ok: false,
                        error: "cannot find user, cannot unfollow"
                    }
                }

                await client.user.update({
                    where: {
                        id: loggedInUser.id
                    },
                    data:{
                        following:{
                            disconnect:{
                                username: username
                            }
                        }
                    }
                })
                return{
                    ok: true,
                }
        })
    }
}

export default resolvers