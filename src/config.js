import 'dotenv/config'

export default {
    port : process.env.port,
    private_key_jwt : process.env.private_key_jwt,
    mongo_atlas_url: process.env.mongo_atlas_url
}