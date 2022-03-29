import { gql } from "apollo-server"
export default gql`
    type CreateAccontResult{
        ok: Boolean!
        error: String
    }
    type Mutation{
        createAccount(
            firstName: String!
            lastName: String
            username: String!
            email: String!
            password: String!
        ): CreateAccontResult!       
    }
`;