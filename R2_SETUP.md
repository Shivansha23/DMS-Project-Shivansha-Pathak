# Cloudflare R2 Setup Guide

This project uses **Cloudflare R2** for object storage, which is S3-compatible and offers zero egress fees.

---

## 🚀 Step-by-Step Setup

### 1. Create Cloudflare Account
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sign up or log in
3. Navigate to **R2** from the sidebar

### 2. Create R2 Bucket
1. Click **"Create bucket"**
2. Enter a bucket name (e.g., `dms-documents`)
3. Select a location (optional)
4. Click **"Create bucket"**

### 3. Get Your Account ID
1. In the R2 dashboard, look for your **Account ID**
2. It will be displayed at the top of the page
3. Copy this for your `.env` file

### 4. Create API Token
1. Click on **"Manage R2 API Tokens"**
2. Click **"Create API Token"**
3. Set permissions:
   - **Object Read & Write**
   - Select your bucket or choose "All buckets"
4. Click **"Create API Token"**
5. Copy the **Access Key ID** and **Secret Access Key**
   - ⚠️ Save these immediately - the secret key won't be shown again!

### 5. Configure Public Access (Optional)
For public file access:
1. Go to your bucket settings
2. Click on **"Settings"** tab
3. Under **"Public Access"**, enable it
4. You'll get a public URL like: `https://pub-xxxxx.r2.dev`

OR set up a custom domain:
1. Go to bucket settings
2. Click **"Connect Domain"**
3. Add your domain
4. Configure DNS as instructed

---

## 🔧 Configuration

### Update `.env` File

```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your-account-id-here
R2_ACCESS_KEY_ID=your-access-key-id-here
R2_SECRET_ACCESS_KEY=your-secret-access-key-here
R2_BUCKET_NAME=dms-documents
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

**Replace with your actual values:**
- `R2_ACCOUNT_ID`: Your Cloudflare account ID
- `R2_ACCESS_KEY_ID`: The access key from step 4
- `R2_SECRET_ACCESS_KEY`: The secret key from step 4
- `R2_BUCKET_NAME`: Your bucket name
- `R2_PUBLIC_URL`: Your public URL (if enabled) or custom domain

---

## 📦 Install Dependencies

The project now uses AWS SDK for S3 (R2 is S3-compatible):

```bash
cd backend
npm install
```

This will install `@aws-sdk/client-s3` which is required for R2.

---

## ✅ Verify Configuration

### Test Upload
1. Start your backend server:
```bash
cd backend
npm start
```

2. Check the console for:
```
✅ Cloudflare R2 initialized
```

3. Upload a test document through the application

### Troubleshooting

**Error: "R2 initialization error"**
- Verify all credentials in `.env`
- Check that R2_ACCOUNT_ID is correct
- Ensure API token has proper permissions

**Error: "Access Denied"**
- Verify Access Key ID and Secret Access Key
- Check bucket permissions
- Ensure API token isn't expired

**Files uploaded but can't access**
- Enable public access on your bucket, OR
- Set up custom domain with public access

---

## 💰 Pricing

Cloudflare R2 offers:
- **Storage**: $0.015/GB/month
- **Class A Operations** (writes): $4.50/million requests
- **Class B Operations** (reads): $0.36/million requests
- **Zero egress fees** 🎉

Free tier includes:
- 10 GB storage/month
- 1 million Class A operations
- 10 million Class B operations

---

## 🔒 Security Best Practices

1. **Never commit credentials**
   - `.env` is already in `.gitignore`
   - Use environment variables in production

2. **Rotate API tokens regularly**
   - Create new tokens every 3-6 months
   - Delete old tokens after rotation

3. **Use least privilege**
   - Only grant necessary permissions to API tokens
   - Use bucket-specific tokens when possible

4. **Enable CORS if needed**
   - Configure in R2 bucket settings
   - Only allow necessary origins

---

## 🌐 Custom Domain Setup (Optional)

### Using Cloudflare Domain
1. Go to your R2 bucket
2. Click **"Connect Domain"**
3. Enter your domain (e.g., `files.yourdomain.com`)
4. Add the CNAME record to your DNS
5. Wait for DNS propagation
6. Update `R2_PUBLIC_URL` in `.env`

### Benefits
- Branded URLs
- Better SEO
- Custom SSL certificates
- DDoS protection

---

## 🔄 Migration from Google Cloud Storage

If you're migrating from GCS:

1. Install new dependencies:
```bash
npm install @aws-sdk/client-s3
npm uninstall @google-cloud/storage
```

2. Update `.env` with R2 credentials

3. Files are now uploaded to R2 instead of GCS

4. Old files in GCS remain accessible via their URLs

5. To migrate existing files:
   - Download from GCS
   - Re-upload to R2
   - Update database URLs

---

## 📚 Additional Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [R2 API Reference](https://developers.cloudflare.com/r2/api/s3/api/)
- [R2 vs S3 Comparison](https://developers.cloudflare.com/r2/reference/comparison/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)

---

## 🆘 Support

Having issues? Check:
1. Cloudflare R2 dashboard for service status
2. API token permissions
3. Bucket configuration
4. Network connectivity

---

**Your DMS now uses Cloudflare R2 for reliable, fast, and cost-effective object storage! 🚀**
