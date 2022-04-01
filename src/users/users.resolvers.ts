import client from "../client";

//이런식으로 query나 mutation뿐만 아니라 그냥 type의 field에 대한 resolver도 만들 수 있다
//computed fields라고 함
//root는 totalfollowing과 totalfollower를 품고 있는 user type이 됨

//totalfollowing과 totalfollower는 db에는 없는 내가 정의한 user type에 있는 변수
//내가 만약 id=1인 user를 찾으면 그 유저의 computed field가 정의되어 있는 함수를 찾고, 실행시킴.
//따라서 root는 그 user를 뜻하게 됨
//await할 필요는 없다
//실제로는 eventual consistency를 사용, 정해진 주기마다 업데이트함.
//지금의 구현은 realtime으로 계속 계산
export default{
    User:{
        totalFollowing: (/*root*/ {id}) => {
            return client.user.count({where:{
                followers:{
                    some:{
                        id,
                    }
                }
            }})
        },
        totalFollowers: ({id}) => {
            return client.user.count({where:{
                following:{
                    some:{
                        id,
                    }
                }
            }})
        },
        //isMe는 로그인 정보가 필요하기 때문에 context를 필요로 함
        isMe: ({id}, _, {loggedInUser}) => {
            if(!loggedInUser){
                return false
            }
            return id==loggedInUser.id
        },
        isFollowing: async ({id},_,{loggedInUser}) =>{
            if(!loggedInUser){
                return false
            }
            const exists = await client.user.findUnique({where:{username:loggedInUser.username}})
            .following({
                where:{
                    id:id
                }
            })
            return exists.length !== 0
        },
        photos: ({id}, {page}) => {
            return client.user.findUnique({
                where:{
                    id: id
                }
            }).photos({
                take: 5,
                skip: 5*(page-1)
            })
        }
    }
}