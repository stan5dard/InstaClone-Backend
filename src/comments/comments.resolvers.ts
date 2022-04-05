export default{
    Comment:{
        isMine: ({userId}, {loggedInUser}) => {
            if(!loggedInUser){
                return false
            }
            return userId==loggedInUser.id
        }
    }
}