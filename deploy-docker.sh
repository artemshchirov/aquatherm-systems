# Run yarn to generate lates lockfiles
# Run yarn build

# ./deploy-docker.sh client | server

export APP=${1}
export DOCKER_NAME=ghcr.io/artemshchirov/ecommerce-template
export TAG=latest
export DOPPLER_TOKEN=dp.pt.GSM3HAFphSd4s3CvMpz9fhUjFTkxNhOlfG6PCJxUiMb

# build
#docker build --platform linux/amd64 -t $DOCKER_NAME  -f ./apps/${APP}/Dockerfile .

docker run -p 8000:80 -e DOPPLER_TOKEN=$DOPPLER_TOKEN -e APP_ENV=prod -e PORT=80 $DOCKER_NAME:$TAG
#docker push $DOCKER_NAME:$TAG

# docker build --platform linux/amd64 -t ecommerce-template-api -f ./apps/api/Dockerfile .
# docker run -p 8000:8000 -e DOPPLER_TOKEN=$DOPPLER_TOKEN -e PORT=$PORT -e APP_ENV=dev $DOCKER_NAME
