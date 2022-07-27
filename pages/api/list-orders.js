import Cookies from "cookies"
import fetch from "node-fetch"
import { getCustomerOrders } from "../../utils/wooCommerceApi"

const handler = async (req,res) => {
    const cookies = new Cookies(req,res)
    const token = cookies.get('jwt') || ''

    if (!token) {
        res.status(401).json({status: 'Unauthorised'})
    }
    console.log(token)

    const options = {
        Method: 'GET',
        headers: {
        Authorization: `Bearer ${token}`}
    }
    const {id: userID, slug: username} = await fetch('http://woocommerce.local/wp-json/wp/v2/users/me', options).then(res => res.json())
    console.log(`User ID is ${userID}`)
    const userOrders = await getCustomerOrders(userID)
    console.log(userOrders)
    const response = {
        userId: userID,
        username: username,
        orders: userOrders
    }
    res.send(response)
}

export default handler;