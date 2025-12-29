const { S3Client } = require('@aws-sdk/client-s3');

let s3Client;
let bucketName;
let publicUrl;

const initializeR2 = () => {
  try {
    s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });

    bucketName = process.env.R2_BUCKET_NAME;
    publicUrl = process.env.R2_PUBLIC_URL;
    
    console.log('✅ Cloudflare R2 initialized');
    return { s3Client, bucketName, publicUrl };
  } catch (error) {
    console.error('❌ R2 initialization error:', error.message);
    console.log('⚠️  R2 will not be available. Please configure credentials.');
    return { s3Client: null, bucketName: null, publicUrl: null };
  }
};

module.exports = { 
  initializeR2, 
  getS3Client: () => s3Client, 
  getBucketName: () => bucketName,
  getPublicUrl: () => publicUrl
};
