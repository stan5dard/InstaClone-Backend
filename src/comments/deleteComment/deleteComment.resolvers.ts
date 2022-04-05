import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers : Resolvers = {
    Mutation:{
        deleteComment : protectedResolver(async (_, {id}, {loggedInUser}) => {
            const comment = await client.comment.findUnique({
                where:{
                    id: id
                },
                select:{
                    userId: true
                }
            })

            if(!comment){
                return{
                    ok:false,
                    error: "Comment not found"
                }
            }
            else if(comment.userId !== loggedInUser.id){
                return{
                    ok: false,
                    error: "Not authorized"
                }
            }
            else{
                await client.comment.delete({
                    where: {
                        id: id
                    }
                })
            }
            return{
                ok:true
            }
        })
    }
}

export default resolvers