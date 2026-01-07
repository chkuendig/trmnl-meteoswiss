docker run \
    --publish 4567:4567 \
    --volume "$(pwd):/plugin" \
    trmnl/trmnlp serve