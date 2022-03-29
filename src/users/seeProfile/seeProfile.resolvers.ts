import {Resolvers} from "../../types"

const resolvers : Resolvers = {
    Query:{
        seeProfile: (_, {username}, {loggedInUser, client}) => client.user.findUnique({
            where:{username:username},
            //그냥 팔로워를 보여달라고 하면 팔로워가 매우 많을 수 있기 때문에
            //db가 불러오는 걸 허락하지 않음
            //include로 억지로 불러올 수 있음
            //이런 쿼리는 보통 pagination으로 처리(스크롤 내릴 때마다 점진적으로 불러오기)
            /*
            include: {
                following: true,
                followers: true,
            }*/
        })
    },
}

export default resolvers