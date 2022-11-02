const multer = require('multer')
const fs = require('fs')
const { generateString } = require('./randomStringGenerator')

const uploader = ( destination, fileNameImage ) => { // di buat function agar bisa dinamis destinasi dan nama prefix image sesuai yang di inginkan
    let defaultPath = './public' // default path yang digunakan upload image
    const storage = multer.diskStorage({ // config dari multer untuk storage / dest
        destination:(req, file, cb)=>{ // cb = callback
            const directory = defaultPath+destination // image akan ke upload sesuai destinasi yang di tuju yaitu /public/{destionation}
            const checkDirectory = fs.existsSync(directory) // variable untuk cek apakan file directorynya udah ada atau belum
            if(checkDirectory){ // check ketika udah ada file defaultnya
                console.log(directory, 'exists')
                cb(null,directory) 
            }else{ // kalau belum ada file defaultnya
                fs.mkdir(directory, { recursive:true }, (err)=>{ // bakal buat file baru kalau file directorynya belum ada
                    console.log(directory, 'make directory')
                    cb(err,directory)
                })
            }
        },
        filename:(req,file,cb)=>{ // cb = callback
            let originName = file.originalname // ngambil nama original yang di upload dari client
            let ext = originName.split('.'); // ambil extention dari filenya
            let uploadedFileName = `${fileNameImage}${Date.now()}${generateString(7)}.${ext[ext.length-1]}` // nama file yang akan di buat
            cb(null,uploadedFileName)
        }
    })

    const fileFilter =(req,file,cb)=>{ // untuk filter jenis file
        const allowedExt = /\.(jpg|jpeg|png)$/; // regex untuk list extention file yang di bolehkan
        if (!file.originalname.match(allowedExt)) return cb(new Error("Only selected file type are allowed"),false)
        cb(null,true)
    }


    return multer({storage,fileFilter, limits: { fileSize: 100000000 }}) // config dari storage, fileFilter di atas, limits untuk size max file
}

module.exports = {
    uploader
}