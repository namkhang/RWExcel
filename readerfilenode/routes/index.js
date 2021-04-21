var express = require('express');
var router = express.Router();
var fs = require('fs')
var xlsx = require('node-xlsx')
var multer = require('multer')

let upload = multer({
  dest : './public/uploads'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/uploadexcel' ,upload.single('file'), (req,res)=>{
  let filename = req.file.path.substring(7);
    let dirnameSubStr = __dirname.substring(0 ,37)
    const workSheetsFromBuffe = xlsx.parse(`${dirnameSubStr}/public/${filename}`)
    res.json(workSheetsFromBuffe[0].data);
    
})

router.post('/createexcel' , (req,res)=>{
  let dirnameSubStr = __dirname.substring(0 ,37)
  let data = req.body.data
  var writeStream = fs.createWriteStream(`${dirnameSubStr}/public/uploads/${req.body.name}.xls`);
  for(let i = 1 ; i< data.length ; i++){
    var row1 = `\uFEFF ${data[i][3]} \t ${data[i][7]} \t ${data[i][9]} \t ${data[i][14]} \n`
    writeStream.write(row1 , 'utf8' );
  }

   res.json({url : `/uploads/${req.body.name}.xls`})


})

module.exports = router;
