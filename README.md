# GitHub Spoints Counter

## Overview

There is a lot of project management that can be simplified through storypoints. This project aims to add storypoints to the GitHub board via browser extension for Firefox (and Chrome in the future).

## Quickstart

To get started, take a look at the [Installation](#installation) steps to install. Then review our [Resources/Instuctions](#resourcesinstructions) to find steps to use the extension.

### Current State

In development

### Installation

The project is currently in development. As such the current installation has not been vetted by the FireFox board and is not downloadable via the FireFox addon website. Please download and use this at your discretion.

Steps to download the addon:

1. Prereqs:
   - [FireFox 48 or higher](https://www.mozilla.org/en-US/firefox/new/)
2. Visit [this page](https://100automations.github.io/github-spoints-counter/#download).
3. Click the link to download.
4. Click Continue to installation.
5. Click Add.
6. Click Okay.
7. (optional) If at a later time, you wish to delete the extension, please visit [this link](https://support.mozilla.org/en-US/kb/disable-or-remove-add-ons#w_removing-extensions) for the latest instructions.

## Resources/Instructions

For instructions on how to use the extension, visit [this site](https://100automations.github.io/github-spoints-counter/#steps).

### Security Note

Although the application embeds user input into the DOM, it does so through `.textContent` which specifically escape strings. Visit [this link](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page#dom_node_creation_methods) to learn more on escaping HTML embeds.
