# Run pnpm to generate lates lockfiles
# Run pnpm build

# ./deploy-docker.sh web | api

export APP=${1}
# export DOCKER_NAME=ghcr.io/artemshchirov/ecommerce-template-api  # github
export DOCKER_NAME=registry.digitalocean.com/ecommerce-template-reg/ecommerce-template
export TAG=latest
export DOPPLER_TOKEN=dp.pt.h72Uqxxe0o5tzLjpQF9cKdXW3aQBVUh0kujSYMO2Nv9

docker build --platform linux/amd64 -t $DOCKER_NAME -f ./apps/${APP}/Dockerfile .

# docker run -p 8000:80 -e DOPPLER_TOKEN=$DOPPLER_TOKEN -e APP_ENV=prod -e PORT=80 $DOCKER_NAME:$TAG
docker push $DOCKER_NAME:$TAG
