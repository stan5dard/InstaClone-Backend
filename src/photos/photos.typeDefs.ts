import {gql} from "apollo-server-express"

export default gql`
    type Photo{
        id: Int!
        user: User
        file: String!
        caption: String
        likes : Int!
        comments: Int!
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
        isMine: Boolean!
    }

    type Hashtag{
        id: Int!
        hashtag: String!
        photos(page: Int!): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }

    type Like{
        Id: Int!
        photo: Photo!
        createdAt: String!
        updatedAt: String!
    }
`