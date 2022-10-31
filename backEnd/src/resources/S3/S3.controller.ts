import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../errors/asyncHandler';

import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const myBucket = new AWS.S3({
    params: { Bucket: process.env.S3_BUCKET_NAME },
    region: process.env.AWS_REGION
})

async function create(req: Request, res: Response) {
    const { fileName, fileType } = req.body

    let s3Url

    async function callS3(){
        myBucket.getSignedUrl('putObject', {
            Key: fileName,
            ContentType: fileType,
            Expires: parseInt(process.env.AWS_URL_EXPIRATION_TIME!)
        } , (err , url) => {
            console.log('s3 URL: ', url)
            s3Url = url // API Response Here
        });
    }

    await callS3()

    console.log('s3Url after call :', s3Url)


    return res.status(200).json({ data: s3Url })
}


export default {
    create: [asyncHandler(create)],
};