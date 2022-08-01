// import Cookies from "cookies";
const cookie = require('cookie')


const handler = async (req,res) => {

    const token = req.headers.cookie
    ? cookie.parse(req.headers.cookie)["jwt"]
    : null

    if (!token) {
        res.status(403).json({status: "User not logged in", user: null})
        return
    }

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const userData = await fetch(`${process.env.WOOCOMMERCE_API_URL}/wp-json/wp/v2/users/me`, options).then(res => res.json())
    const {id, name, slug:user} = userData
    const response = {
        status: "Logged in",
        user: {
            id,
            name,
            user
        }
    }

    res.send(response)
}

export default handler;