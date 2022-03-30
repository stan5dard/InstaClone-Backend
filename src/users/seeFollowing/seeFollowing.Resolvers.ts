import client from "../../client";
import { Resolvers } from "../../types";

const resolvers:Resolvers = {
    Query: {
        //cursor pagination 구현
        //프론트엔드에서 마지막으로 본 항목(cursor)를 기억했다가 서버에 전송
        //서버는 cursor를 보고 다음 항목부터 다시 전송함 (다음 항목부터 전송하므로 skip1 이 들어감)
        //커서 방식은 무제한 스크롤이 필요할 때 좋음
        //그러나 원하는 페이지로 옮겨다닐 수 없음
        seeFollowing: async(_, {username, lastId}) => {
            try{
                const ok = await client.user.findUnique({
                    where:{username: username}, select:{id: true}
                    //단순히 사용자의 존재를 확인하기 위해 모든 정보를 불러오는 건 오버헤드가 큼
                    //select로 id정보만 불러오자
                })
                if(!ok){
                    return{
                        ok: false,
                        error: "cannot find the user"
                    }
                }
    
                //첫 번째 페이지를 불러오는 경우 커서가 존재하지 않는다. 커서의 존재를 먼저 체크
                const following = await client.user.findUnique({where:{username: username}}).following({
                    take:5,
                    skip: lastId? 1:0,
                    ...(lastId && {cursor: {id:lastId}})
                })
                return {
                    ok: true,
                    following: following
                }
            }catch(e){
                return{
                    ok: false,
                    error: "error inside seefollowing"
                }
            }
            
        }
    }
}

export default resolvers