import { prisma } from "@prisma/client";
import client from "../../client";
import { Resolvers } from "../../types";

const resolvers:Resolvers = {
    Query:{
        seePhotoComments: async(_, {id}) => {
            return client.comment.findMany({
                where:{
                    id: id
                },
                orderBy:{
                    createdAt: "asc"
                }
            })
        }
    }
}

export default resolvers