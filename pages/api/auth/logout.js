const cookie = require('cookie')

const handler = async (req,res) => {

    res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", "", {
          maxAge: -1,
          path: "/",
        })
      );
    res.status(200).json('Logged out')
}

export default handler;