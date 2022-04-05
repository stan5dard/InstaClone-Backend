import client from "../../client";
import { Resolvers } from "../../types";

const resolvers : Resolvers = {
    Query:{
        seePhotoLikes : async (_, {id}) => {
            const likes = await client.like.findMany({
                where:{
                    photoId : id
                },
                select: {
                    user: true
                }
            })
            // select vs include
            // include는 결과에 relationship을 추가해줌
            //select는 그냥 받고 싶은 데이터만을 받아오고 싶을 떄
            // 위에서 user를 select 했으므로 like의 수많은 필드 중 유저 필드의 자세한 내용만 받아 옴
            // include를 했을 경우 like의 많은 필드를 받아오고 추가적으로 유저 필드의 자세한 내용을 받아 옴
            // 그냥 include 없이 요청했을 경우 유저 필드는 앱스트랙하게 받아옴
            // select와 inlcude는 함께 사용될 수 없음
            // select:{user:{select: username})하면 유저 내용 중 유저네임만 받아올 수 있음
            return likes.map((like) => like.user)
        }
    }
}

export default resolvers