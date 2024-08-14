const Firm = require('../models/Firm')
const Vendor = require('../models/Vendor')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory to save the uploaded files
      const uploadDir = 'uploads';
      if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      // Specify the filename for the uploaded file
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize multer with the defined storage
  const upload = multer({ storage: storage });

const addFirm = async(req,res)=>{
    try{
    const {firmName,area,category,region,offer}=req.body

const image=req.file? req.file.filename :undefined

const vendor = await Vendor.findById(req.vendorId)
    if(!vendor){
        return res.status(404).json({message:"Vendor not found"})
    }

const firm =new Firm({ 
    firmName,
    area,
    category,
    region,
    offer,
    image,
    vendor: vendor._id})

const savedFirm = await firm.save()

vendor.firm.push(savedFirm._id)

await vendor.save()


return res.status(200).json({message:"Firm added Successfully"})

}catch(error){
    console.error(error)
    return res.status(500).json("internal server error")
  
}
}


const deleteFirmById = async(req,res)=>{
    try{
      const firmId = req.params.firmId

      const deleteProduct = await Firm.findByIdAndDelete(firmId)

      if(!deleteProduct){
        return res.status(404).json({error:"no product found"})
      }
    }catch{error}{
      console.error(error)
    res.status(500).json({error:"internal server error"})
  }
    
  }
module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}