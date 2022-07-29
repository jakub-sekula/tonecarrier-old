import Cookies from "cookies";


const handler = async (req,res) => {
    const token = new Cookies(req,res).get('jwt') || undefined;

    if (!token) {
        res.status(403).json("User not logged in")
        return
    }

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const resp = await fetch(`${process.env.WOOCOMMERCE_API_URL}/wp-json/wp/v2/users/me`, options).then(res => res.json())
    res.send(resp)
}

export default handler;