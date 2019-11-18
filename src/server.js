const express = require('express');
const parser = require("body-parser");
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv')

dotenv.config()

const app = express();
const port = 4000;
const cors = require('cors');
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_IAM_USER_KEY,
    secretAccessKey: process.env.AWS_IAM_USER_SECRET,
    Bucket: process.env.AWS_BUCKET_NAME
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
          },
          key: function (req, file, cb) {
            cb(null, Date.now() + '.mp4')
          }
    })
})


app.use(parser.urlencoded({extended: false,limit: '50mb'}));
app.use(parser.json());
app.use(cors())


app.post("/api/v1/video", upload.single('file'), (req, res, next) => {
    res.send("The video is uploaded!")
});


app.listen(port, () => console.log(`Api is listening on post ${port}`))