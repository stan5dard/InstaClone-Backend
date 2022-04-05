import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Mutation:{
        createComment: protectedResolver(async(_, {photoId, payload}, {loggedInUser})=>{
            const ok = await client.photo.findUnique({
                where:{
                    id: photoId
                },
                select:{
                    id: true //단순히 사진을 체크하기 위한 용도이므로 모든걸 다 불러와 오버헤드를 줄 필요는 없다.
                }
            })
            if(!ok){
                return{
                    ok: false,
                    error: "Photo not found"
                }
            }
            await client.comment.create({
                data:{
                    payload,
                    photo:{
                        connect:{
                            id: photoId
                        }
                    },
                    user: {
                        connect: {
                            id: loggedInUser.id
                        }
                    }
                }
            })

            return{
                ok: true
            }
        })
    }
}

export default resolvers