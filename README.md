# Automated Factorio Updates via AMP Server Manager Integration

## Description

This repository provides a script set up that interfaces with the CubeCoders AMP server manager to automatically update your Factorio game. This integration allows for seamless updates of your game without manual intervention, ensuring you always have the latest version running on your server.

## What this solves

Today, running Factorio within AMP on a linux system does not use SteamCMD to download the headless server.

As a result, there is no way to "automatically trigger" a headless update without external tooling. This repository provides a solution that allows for automatic updates of Factorio while still utilizing AMP's builtin update mechanism.

Additionally, if AMP updates their scheduler to handle this edge case, it should be a drop-in replacement/deprecation of this script.


## Setup and Usage

1. Clone this repository to your local machine
2. Place the script in a convenient location on your server (e.g., `/opt/factorio-amp-updater`)
3. Configure the script by creating a `.env` file:
    * Set `AMP_SERVER_URL` to the URL of your AMP server
    * Set `USERNAME` to the AMP username
    * Set `PASSWORD` to the AMP user password
    * Set `FRIENDLY_NAME` to your AMP instance friendly name
    * Set `EVENT_DESCRIPTION` to your AMP instance event description
    * Set `FILE_PATH` to the info.json for the base mod - eg `~/.ampdata/instances/Instance01/factorio/server/data/base/info.json`
    * (see https://factorio.com/api/latest-releases for these setting values)
    * Set `BRANCH` to the factorio branch - eg stable or experimental 
    * Set `SERVER_TYPE` to the server type - eg `headless`
4. Run the script using `./version_check.sh` (ideally in a cron job)
5. The script will compare the local and remote versions, and if they do not match, fire an event trigger to the AMP instance.

## Licence

No licence.
