import client from "../../client";
import { Resolvers } from "../../types";

const resolvers:Resolvers = {
    Query:{
        searchPhotos: async (_, {keyword, page}) =>{
            return await client.photo.findMany({
                where:{
                    caption:{
                        startsWith: keyword
                    }
                },
                take: 5,
                skip: 5*(page-1)
            })
        }
    }
}
export default resolvers