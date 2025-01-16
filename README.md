# Automated Factorio Updates via AMP Server Manager Integration

## Description

This repository provides a script set up that interfaces with the CubeCoders AMP server manager to automatically update your Factorio game. This integration allows for seamless updates of your game without manual intervention, ensuring you always have the latest version running on your server.

## Features

* Automatic Factorio updates triggered via AMP server manager

## Setup and Usage

1. Clone this repository to your local machine
2. Place the script in a convenient location on your server (e.g., `/opt/factorio-amp-updater`)
3. Configure the script by creating a `.env` file:
	* Set `AMP_SERVER_URL` to the URL of your AMP server
	* Set `USERNAME` to the AMP username
	* Set `PASSWORD` to the AMP user password
    * Set `FRIENDLY_NAME` to your AMP instance friendly name
    * Set `EVENT_DESCRIPTION` to your AMP instance event description
4. Run the script using `./version_check.sh` (ideally in a cron job)
5. The script will compare the local and remote versions, and if they do not match, fire an event trigger to the AMP instance.

## Licence

No licence.
