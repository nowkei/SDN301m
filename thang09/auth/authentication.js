import jwt from 'jsonwebtoken'

const checkToken =async (req, res, next) =>{
    //Xac dinh nhung request nao duoc phep di qua ma khong can kiem tra ?
    //Bypass : login, register

    if(req.url.toLowerCase().trim() == '/users/login'.toLowerCase().trim() ||
       req.url.toLowerCase().trim() == '/users/register'.toLowerCase().trim()){
        //chuyen tiep
        next()
        //ket thuc qua trinh kiem tra   
        return
    }

const listByPassURL = [
    '/users/login',
    '/users/register'
]

function checkExistURL(url){
    listByPassURL.forEach(u => {
        if(u.toLowerCase().trim() == url.toLowerCase().trim()){
            return true;
            
        }
    })
}

    //xac thuc JWT cua request can kiem tra?
    const token = req.headers?.authorization?.split(' ')[1]
    try {
        const jwtObject =await jwt.verify(token, process.env.SECRET_KEY_JWT)
        // boc tack ra du lieu cua expried( thoi gian song cua JWT)
        let isExpried = Boolean( jwtObject.exp < Date.now() /1000 )
        if(isExpried){
            res.status(400).json({
                message: 'Access token expried'
            })
            res.end()
        }else{
            next()
        }

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status:'linh anh'
        })
    }
}

export default checkToken
