import bcrypt from "bcrypt"
import { Resolvers } from "../../types";

const resolvers : Resolvers = {
    Mutation:{
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email,
            password,
        }, {client}) => {
            try{
                //check if username or email are already on DB
                const existingUser = await client.user.findFirst({
                    where:{
                        OR:[
                            {
                                username: username,
                            },
                            {
                                email: email,
                            }
                        ]
                    }
                });

                if(existingUser){
                    throw new Error("This username/email is already taken.");
                }

                //hash password 비번을 비번 그대로 저장하지 않기 위함
                const uglyPassword = await bcrypt.hash(password, 10);
                await client.user.create({data:{
                    username, 
                    email, 
                    firstName, 
                    lastName, 
                    password: uglyPassword
                }})

                return{
                    ok: true,
                }
                //save and return the user
            } catch(e){
                return {
                    ok: false,
                    error: "cannot create account",
                }
            }
        },
    },
};

export default resolvers