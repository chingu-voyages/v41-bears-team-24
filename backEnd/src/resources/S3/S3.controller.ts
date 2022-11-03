import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../errors/asyncHandler';
import crypto from 'crypto'
import { promisify } from 'util';

import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const myBucket = new AWS.S3({
    params: { Bucket: process.env.S3_BUCKET_NAME, signatureVersion: 'v4' },
    region: process.env.AWS_REGION
})

const randomBytes = promisify(crypto.randomBytes)

async function create(req: Request, res: Response) {
    const rawBytes = await randomBytes(16)
    // 32 character hexadecimal string
    const imageName = rawBytes.toString('hex')

    const { fileType } = req.body

    console.log('fileType: ', fileType)

    const uploadUrl = await myBucket.getSignedUrlPromise('putObject', {
        Key: imageName,
        ContentType: fileType,
        Expires: parseInt(process.env.AWS_URL_EXPIRATION_TIME!)
    })

    return res.status(200).json({ data: uploadUrl })
}


export default {
    create: [asyncHandler(create)],
};