# 🎤 ⚡️ ConfPad

## How to add a conference

1. Fork project to your account
2. Add conference metadata into `data/conferences.yaml`
   * Conference ID must be in format `yyyy-mm-dd-conference-name`
     * `yyyy-mm-dd`: ISO date of the first day of the conference
     * `conference-name`: conference name slug (React Alicante 2018 > react-alicante-2018)
3. Create a new file `data/conferences/yyyy-mm-dd-conference-name.yaml`
4. Commit changes and submit a pull request


## Development

1. You need to set up a simple web server as JS modules in browsers don't work via local filesystem
2. Just `cd` into the root directory and run one of the servers:
3. * PHP: `php -S 0.0.0.0:8080`
   * Python: `python -m SimpleHTTPServer 8080`

## TODO

* Implement heureka.cz/ui
* Add microdata
* Show day and location for individual talks
* Add filters for days and locations
* Add tests
* Add CI
* Make it PWA
