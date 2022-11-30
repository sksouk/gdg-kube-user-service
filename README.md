
# Get login to AWS account
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin [user_role_id].dkr.ecr.ap-southeast-1.amazonaws.com

# Build server to images
docker build -t [service_name] . --platform=linux/amd64

# Make image tag version on AWS ECR
docker tag [service_name]:latest [user_role_id].dkr.ecr.ap-southeast-1.amazonaws.com/[service_name]:latest

# Push image to AWS ECR
docker push [user_role_id].dkr.ecr.ap-southeast-1.amazonaws.com/[service_name]:latest