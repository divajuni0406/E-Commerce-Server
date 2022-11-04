const { Category } = require('../models')

const getAllCategory = async (req, res) => {
    try {
        const getAlldata = await Category.find()
        res.status(200).json({
            message: "successfully get data",
            result: getAlldata
        })
    } catch (error) {
        res.status(404).json({message: "failed get data"})
    }
}

const addCategory = async(req,res)=>{
    const { name } = req.body
    try {
        const findCategory = await Category.findOne({name})
        if(findCategory){
            res.json({message:`${name} already in category`})
        }else{
            const postCategory = await Category.create({name, deleted:false})
            res.status(201).json({message:'berhasil add category', data:postCategory})
        }

    } catch (error) {
        res.status(500).json({message:error})
    }
}


const editCategory=async(req,res)=>{
    const dataEdit = req.body
    const { id } = req.params
    try {
        const patchCategory = await Category.updateOne({_id:id}, {$set:dataEdit})
        res.status(201).json({message:'berhasil edit', data:patchCategory})
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const deleteCategory=async(req,res)=>{
    console.log('masuk delete category')
    const { id } = req.params
    try {
        const deleted = await Category.deleteOne({_id:id})
        res.status(201).json({message:'berhasil delete', data:deleted})

    } catch (error) {
        res.status(500).json({message:error})
        
    }
}

module.exports = {
    getAllCategory,addCategory,editCategory,deleteCategory
}