import { createWriteStream } from "fs"
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolver,  } from "../../types";
import { GraphQLUpload } from "graphql-upload";

const resolverFn : Resolver = async (
    _,
    { firstName, lastName, username, email, password: newPassword, bio, avatar},
    { loggedInUser, client, /*protectResolver*/ } //이런 식으로 콘텍스트에 protect resolver 함수를 보내 모든 리솔버가 볼 수 있도록 가능
) => {
    
    
    //토큰을 매번 리솔버마다 아규먼트로 넣는 건 짜증나므로 http 헤더에 토큰을 넣어 보내자
    //context에서 토큰을 받아올 거임
    //graphql을 생성하는 apollo서버에서 토큰을 http에 집어넣을 것
    //console.log(loggedInUser)

    //서버에 이미지 파일을 저장하지 않음
    //서버에는 오직 코드만 돌고 있어야 함
    //다른 하드 역할을 담당하는 서버에 다 저장해놓고 url을 반환

    let avatarUrl = null;
    if(avatar){
        const{ filename, createReadStream } = await avatar;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd()+"/uploads/"+newFilename) //현재 작업중인 폴더에 업로드 폴더에 저장
        readStream.pipe(writeStream)
        avatarUrl = `http://localhost:4000/static/${newFilename}` //서버에 사진을 직접 저장하지 않고 url만 저장
    }
    let uglyPassword = null;
    if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }), // ugly가 존재하면 pass에 ugly를 넣어 보냄
            ...(avatar && {avatar: avatarUrl})
        },
    });
    if (updatedUser.id) {
        return {
            ok: true,
        };
    } else {
        return {
            ok: false,
            error: "Could not update profile.",
        };
    }
}

export default{
    Upload: GraphQLUpload,
    Mutation: {
        editProfile: protectedResolver(resolverFn)
    },
};