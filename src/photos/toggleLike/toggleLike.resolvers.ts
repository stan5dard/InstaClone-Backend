import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers : Resolvers = {
    Mutation : {
        toggleLike: protectedResolver(async(_,{id},{loggedInUser})=>{
            const ok = await client.photo.findUnique({
                where:{
                    id: id
                }
            })

            if(!ok){
                return{
                    ok: false,
                    error: "Photo not found"
                }
            }

            const like = await client.like.findUnique({})
        })
    }
}