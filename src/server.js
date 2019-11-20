const express = require('express');
const parser = require("body-parser");
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT;
const host = process.env.HOST_NAME;
app.use(parser.urlencoded({extended: false, limit: '50mb'}));
app.use(parser.json());
app.use(cors());

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_IAM_USER_KEY,
    secretAccessKey: process.env.AWS_IAM_USER_SECRET,
    Bucket: process.env.AWS_BUCKET_NAME
});

const uploadS3 = multer({
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
});

app.post("/api/v1/video", uploadS3.single('file'), (req, res, next) => {
    res.send("The video is uploaded!")
});

app.listen(port, host, () => console.log(`App is listening on port ${port}`));
