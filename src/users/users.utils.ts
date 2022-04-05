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
    //root는 computedfield 같은 곳에서 parent의 다른 변수를 접근할 때
    //context는 전체에 공유되는 정보
    //info는 query인지 mutation인지 알 수 있음

    if(!context.loggedInUser){
        const query = info.operation.operation === "query"
        if(query){
            return null
        }
        else{
            return{
                ok: false,
                error: "Please login to perform this action"
            }
        }
        
    }
    return ourResolver(root, args,context, info)
}