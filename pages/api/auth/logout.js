import Cookies from "cookies";


const handler = async (req,res) => {
    const cookies = new Cookies(req,res)

    cookies.set('jwt', '', {maxAge: -1})
    res.status(200).json('Logged out')
}

export default handler;