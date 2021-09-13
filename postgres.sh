#!/bin/zsh
docker run --rm --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword postgres:13.4
