import Cookies from "cookies";


const handler = async (req,res) => {
    const cookies = new Cookies(req,res);
    const token = cookies.get('jwt')

    const options = {
        Method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const resp = await fetch('http://woocommerce.local/wp-json/wp/v2/users/me', options).then(res => res.json())
    res.send(resp)
}

export default handler;