import 'dotenv/config'

export default {
    port : process.env.port,
    private_key_jwt : process.env.private_key_jwt,
    mongo_atlas_url: process.env.mongo_atlas_url,
    host: process.env.host,
    password_ethereal: process.env.password_ethereal,
    email_ethereal: process.env.email_ethereal,
    port_ethereal: process.env.port_ethereal
    
}