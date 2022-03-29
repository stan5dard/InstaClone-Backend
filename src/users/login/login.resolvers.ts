import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Resolvers } from "../../types"

const resolvers : Resolvers = {
    Mutation:{
        login: async(_, {username, password}, {client}) => {
            //find user with args.username
            const user = await client.user.findFirst({where : {username:username}})
            if(!user){
                return{
                    ok: false,
                    error: "User not found",
                };
            }

            //check password with args.password
            const passwordOK = await bcrypt.compare(password, user.password)
            if(!passwordOK){
                return{
                    ok: false,
                    error: "Incorrect password",
                }
            }

            //issue a token and send it to the user
            const token = await jwt.sign({ id:user.id }, process.env.SECRET_KEY)
            return{
                ok: true,
                token,
            };
        },
    },
};

export default resolvers;