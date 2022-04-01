import client from "../../client";
import { Resolvers } from "../../types";

const resolvers : Resolvers = {
    Query:{
        seePhoto: async (_,{id}) => {
            const ph = client.photo.findUnique({
                where:{
                    id: id
                }
            })
            return ph
        }
    }
}

export default resolvers