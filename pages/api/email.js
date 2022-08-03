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
    const userDataResponse = await fetch(`${process.env.WOOCOMMERCE_API_URL}/wp-json/api/v1/me/email`, options)
    const userDataJson = await userDataResponse.json()

    
    res.status(200).json(userDataJson)
}

export default handler;