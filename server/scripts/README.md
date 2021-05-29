# Server Scripts

This directory contains backend scripts that do things outside the normal user flow of Waterpark.

## Getting Started

Unlike the rest of this repository, the scripts are written in Python, so special setup is needed:

1. Install [Python 3](https://www.python.org/downloads/).
1. From this directory, run `python -m venv env` to set up a virtual environment called `env`.
1. Run `pip install -r requirements.txt` to install the dependencies.
   > If you install any new packages, please run `pip freeze > requirements.txt` in this directory to update the list of dependencies.
1. Continue reading below for special instructions specific to each script.

## Scripts

### `populate.py`

This script populates a PostgreSQL database with initial objects defined in `clubs.yml`. To target the DB, the script requires a `db.ini` configuration file to be added to this directory. Here is a sample `db.ini` file that targets the local DB created by running `docker-compose up` using the [default backend setup](../README.md):

```ini
[postgresql]
host=localhost
database=clubs
user=loolabs
password=loolabs
```

`clubs.yml` should be updated to keep up with schema changes and new data.
