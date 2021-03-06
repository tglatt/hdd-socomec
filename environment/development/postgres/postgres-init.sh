#!/bin/bash
set -e

POSTGRES_HDD_SOCOMEC_DATABASE="hdd_socomec"
POSTGRES_HDD_SOCOMEC_USER=${POSTGRES_HDD_SOCOMEC_USER:="hdd"}
POSTGRES_HDD_SOCOMEC_PASSWORD=${POSTGRES_HDD_SOCOMEC_PASSWORD:="hdd"}

psql -v ON_ERROR_STOP=1 --username postgres <<-EOSQL
  CREATE DATABASE $POSTGRES_HDD_SOCOMEC_DATABASE;

  CREATE USER $POSTGRES_HDD_SOCOMEC_USER with encrypted password '$POSTGRES_HDD_SOCOMEC_PASSWORD';
  GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_HDD_SOCOMEC_DATABASE TO $POSTGRES_HDD_SOCOMEC_USER;

  CREATE DATABASE metabase;

EOSQL
