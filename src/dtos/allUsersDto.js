export default class AllUsersDto{
    constructor(user){
        this.name = user.first_name
        this.lastname = user.last_name
        this.email = user.email
        this.role = user.role
    }
}