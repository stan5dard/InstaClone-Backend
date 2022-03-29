import client from "../client"
import * as jwt from "jsonwebtoken"
import {Resolver} from "../types"

export const getUser = async (token) => {
    // 토큰에서 사용자의 id를 받아오는 함수
    try{
        if(!token){
            //계정이 생성되기 이전의 리퀘스트들은 토큰이 없다.
            return null;
        }
        const verifiedToken:any = await jwt.verify(token, process.env.SECRET_KEY)
        if("id" in verifiedToken){
            const user = await client.user.findUnique({where: {id: verifiedToken["id"]}});
            console.log(user)
            if(user){
                return user;
            }
        }
        return null;
    }
    catch{
        return null;
    }   
}

export const protectedResolver = (ourResolver : Resolver) => (root, args, context, info) => {
    //로그인과 관련된 리턴을 편하게 주려고 만든 함수
    if(!context.loggedInUser){
        return{
            ok: false,
            error: "Please login to perform this action"
        }
    }
    return ourResolver(root, args,context, info)
}