# Video uploader to AWS S3 
## Environment settings
Before running the application, you need to define values in the .env file. 
The necessary variables represented in .env.example file:

    HOST_NAME=name of the host for application (localhost for eample)
    PORT=running port of application (4000 for example)
    AWS_IAM_USER_KEY=some key for AWS IAM user
    AWS_IAM_USER_SECRET=secret for this user 
    AWS_BUCKET_NAME=bucket name in S3
