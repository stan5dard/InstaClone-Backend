import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers:Resolvers = {
    Mutation:{
        uploadPhoto: protectedResolver(async(_,{file, caption}, {loggedInUser})=>{
            let hashtagObjs = []
            if(caption){
                //parse caption
                //get or create hashtags
                const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g)
                //없는 해시태그면 해시태그에 새로 추가하고 있는거면 이미 있는 거에 연결
                hashtagObjs = hashtags.map(hashtag=>({where:{hashtag}, create:{hashtag}}))
                console.log(hashtagObjs)
            }
            return client.photo.create({
                data:{
                    user:{
                        connect:{
                            id: loggedInUser.id
                        }
                    },
                    file,
                    caption,
                    ...(hashtagObjs.length >0 && {
                        hashtags:{
                            connectOrCreate:hashtagObjs
                        }
                    })
                }
            })
            //save photo with parsed hashtags
            // add the photo to the hashtags 해시태그 검색을 위한 기능
        })
    }
}

export default resolvers