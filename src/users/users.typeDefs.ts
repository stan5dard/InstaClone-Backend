import {gql} from "apollo-server";

export default gql`
    type User{
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String!
        bio: String
        avatar: String
        following: [User]
        followers: [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isFollowing: Boolean!
        isMe: Boolean!
    }
`;
//isfollowing은 들어간 페이지가 내가 이미 팔로우한 사람 페이지인지
//isMe는 들어간 페이지가 내 페이지인지