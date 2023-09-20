export default class UserDto{
    constructor(user){
        this.name = user.first_name
        this.lastname = user.last_name
        this.id = user._id
        this.email = user.email
        this.cart = user.cart
        this.role = user.role
    }
}