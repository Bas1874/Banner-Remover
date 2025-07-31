# Seanime Banner Remover Plugin

A simple plugin for Seanime that allows you to hide various large banner images throughout the user interface, providing a cleaner, more compact browsing experience.


# Before
![Plugin Screenshot](https://github.com/Bas1874/Banner-Remover/blob/4f005e98a3588daef0e9285d9888c797c9da7cfb/src/gifs/Showcase5.gif)

# After
![Plugin Screenshot](https://github.com/Bas1874/Banner-Remover/blob/4f005e98a3588daef0e9285d9888c797c9da7cfb/src/gifs/Showcase3.gif)

## About The Plugin

This plugin adds a simple icon to your Seanime tray menu, allowing you to toggle the visibility of each banner type individually. Your preferences are saved locally and applied automatically every time you start Seanime.

## Features

-   **Modular Hiding:** Independently hide banners on the following pages:
    -   Discovery Page
    -   Library Page
    -   Anime Entry Pagesr.

## Installation

1.  Navigate to **Settings > Extensions** in your Seanime application.
2.  Click on the **Add Extension** button.
3.  Paste the following URL into the input field and click **Submit**:

    ```
    https://raw.githubusercontent.com/Bas1874/Banner-Remover/main/plugin.json
    ```
4.  The plugin will be installed automatically.

## Usage

1.  After installation, find the new icon in the Seanime tray on the left-hand sidebar.
2.  Click the icon to open the **Banner Settings** menu.
3.  Use the toggles to enable or disable the banners you wish to hide.
4.  If you hide the "Discovery Page Banner", a sub-option will appear to also hide the top bar.
5.  Click the **Save** button to apply and save your changes. The UI will update instantly.

## Configuration Options

-   **Hide Discovery Page Banner**: Toggles the large rotating banner at the top of the Discover page.
-   **Hide Library Page Banner**: Toggles the dynamic background banner at the top of your Library page.
-   **Hide Anime Entry Page Banner**: Toggles the banner at the top of an individual anime's detail page.
-   **...and also hide the top bar**: A checkbox that only appears when the Discovery Page Banner is hidden. It removes the entire top section of the Discover page.
