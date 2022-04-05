import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

//나중에 pagination 하기
const resolvers :Resolvers = {
    Query:{
        seeFeed: protectedResolver(async (_, __, {loggedInUser}) => {
            // 내가 팔로우 하고 있는 사람들 찾기
            return await client.photo.findMany({
                where:{
                    OR: [
                        {
                            user:{
                                followers:{
                                    some:{
                                        id: loggedInUser.id
                                    }
                                }
                            }
                        },
                        {
                            userId : loggedInUser.id
                        }
                    ]
                },
                orderBy:{
                    createdAt: "desc"
                }
            })
        })
    }
}

export default resolvers