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