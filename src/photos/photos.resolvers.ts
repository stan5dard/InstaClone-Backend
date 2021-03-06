import client from "../client"

export default{
    Photo:{
        user: ({userId}) => {
            return client.user.findUnique({
                where:{
                    id: userId
                }
            })
        },
        hashtags: ({id}) => {
            return client.hashtag.findMany({
                where:{
                    photos:{
                        some:{
                            id:id
                        }
                    }
                }
            })
        },
        likes: ({id}) => {
            return client.like.count({where: {photoId:id}})
        },
        comments: ({id}) => {
            return client.comment.count({where: {photoId: id}})
        },
        isMine: ({userId}, {loggedInUser}) => {
            if(!loggedInUser){
                return false
            }
            return userId==loggedInUser.id
        }
    },

    Hashtag:{
        photos: ({id}, {page}, {loggedInUser}) => {
            return client.hashtag.findUnique({
                where:{
                    id: id
                }
            }).photos({
                take: 5,
                skip: 5*(page-1)
            })
        },
        totalPhotos: ({id}) =>{
            return client.photo.count({
                where:{
                    hashtags:{
                        some:{
                            id: id
                        }
                    }
                }
            })
        }
    }
}