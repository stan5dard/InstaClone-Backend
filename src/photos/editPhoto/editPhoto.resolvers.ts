import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utilities";

const resolvers:Resolvers = {
    Mutation:{
        editPhoto: protectedResolver(
            async (_, {id, caption}, {loggedInUser}) => {
                const oldphoto = await client.photo.findFirst({
                    where:{
                        id: id,
                        userId: loggedInUser.id
                    },
                    include:{
                        hashtags:{
                            select: {
                                hashtag : true
                            }
                        }
                    }
                })

                //console.log(oldphoto)
                if(!oldphoto){
                    return{
                        ok: false,
                        error: "photo not found"
                    }
                }
                //해시태그 다시 설정
                const photo = await client.photo.update({
                    where:{
                        id: id
                    },
                    data:{
                        caption: caption,
                        hashtags:{
                            disconnect: oldphoto.hashtags,
                            connectOrCreate: processHashtags(caption)
                        }
                    }
                })

                return{
                    ok:true
                }
                
            }
        )
    }
}

export default resolvers