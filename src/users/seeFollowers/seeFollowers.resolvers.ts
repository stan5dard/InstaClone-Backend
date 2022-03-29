import client from "../../client";
import { Resolvers } from "../../types";

const resolvers:Resolvers = {
    Query:{
        seeFollowers: async(_, {username, page}) =>{
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
                //offset pagination의 구현
                //느리지만 어느 페이지로 가고 싶은지 정할 수 있음
                //유저가 어느 페이지로 가고 싶은지 알려줘야 함
                //cursor pagination은 seefollowing 참고
                const followers = await client.user.findUnique({
                    where:{
                        username: username,
                    }
                }).followers({
                    take:5,
                    skip:5 * (page-1), // 한방에 모든 팔로워를 불러울 경우 팔로워가 많으면 서버가 뻗는다.
                })
                const totalFollowers = await client.user.count({
                    where:{
                        following:{
                            some: {
                                username: username,
                            }
                        }
                    }
                })
                return{
                    ok: true,
                    followers: followers,
                    totalPages: Math.ceil(totalFollowers/5)
                }
            }catch(e){
                return{
                    ok: false,
                    error: "error occurred inside seefollowers"
                }
            }
            
            
            /*
            const bFollowers = await client.user.findMany({
                where:{
                    following:{
                        some:{
                            username:username,
                        }
                    }
                }
            })
            */
        }
    }
}

export default resolvers