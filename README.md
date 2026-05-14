# mac-address

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository contains open data acquired through Wi-Fi packet sensing at Kanazawa University, Japan, for the purpose of analyzing tourist behavior.

The repository is published by the Hokuriku Inbound Tourism DX/Data Consortium.

## About the Data

The raw data consists of Wi-Fi probe requests captured at various tourist facilities. Each record represents a device detection event.

-   **User Identifier (`ユーザー情報`)**: The user's MAC address is anonymized using a SHA-256 hash.
-   **Data Structure**: Raw data is organized by facility and date in the following structure:
    ```
    ./[FacilityID]_[FacilityName]/[YYYYMMDD]/[YYYYMMDD].csv
    ```
    For example: `27_Higashichaya_Gold_Leaf_Sakuda/20241010/20241010.csv`

### Raw Data Columns
-   `時間`: Timestamp of the detection event.
-   `施設No`: Unique ID for the facility where the event was recorded.
-   `ユーザー情報`: Hashed MAC address of the detected device.

## Processed Datasets

The following aggregated datasets can be generated from the raw data using the provided scripts.

-   [user.csv](user.csv): A summary for each unique user, including their movement route between facilities.
-   [move.csv](move.csv): A consolidated log of all user movements. Detections for the same user at the same facility within a 30-minute window are aggregated into a single entry with a calculated dwell time.
-   [move/](move): The same movement data as `move.csv`, but split into individual CSV files per facility.

### Data Summary
-   **Total raw records**: 30,794,029
-   **Total unique users**: 3,651

## Generating the Processed Datasets

[Deno](https://deno.land/) is required to run the processing scripts. The following commands should be run in order.

1.  **Process raw data and create user-specific files:**
    This script reads the raw data, consolidates records within a 30-minute window into single stay events, and creates intermediate files in the `user/` directory.
    ```sh
    deno run -A make.js
    ```

2.  **Generate user and movement datasets:**
    This script aggregates the intermediate files to generate `user.csv` and `move.csv`.
    ```sh
    deno run -A make2.js
    ```

3.  **Generate facility-level movement data:**
    This script splits `move.csv` into facility-specific files and places them in the `move/` directory.
    ```sh
    deno run -A separatemove.js
    ```

## License

MIT License — see [LICENSE](LICENSE).