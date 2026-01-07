docker run \
    --publish 4567:4567 \
    --volume "$(pwd):/plugin" \
    --env-file ./.env \
    -it \
    trmnl/trmnlp push