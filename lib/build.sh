#for local testing/or local docker container
image=react-api-preview
container=react-api-preview
port=3138
#should coming from git commit hash
version=1

rm storybook-static
docker stop $container
docker rm $container
docker image rm $image
docker build -t $image -f Dockerfile . --build-arg REACT_APP_VERSION=$version
docker run --env PORT=80 -d -p $port:80 --name $container $image