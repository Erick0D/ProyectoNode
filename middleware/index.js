module.exports=(req,res,next) => {
    return res.status(200).json({code: 1, message: "Sistema del departamento de recursos humanos de la empresa Taller de Node.js S.A. de C.V."});
};