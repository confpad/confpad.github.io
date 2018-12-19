# ⚡️ ConfPad

## How to add a conference

1. [Fork project](https://help.github.com/articles/fork-a-repo/)
2. Add conference metadata into `data/conferences.yaml`
   * Conference ID must be in format `yyyy-mm-dd-conference-name`
     * `yyyy-mm-dd`: first day of the conference
     * `conference-name`: slug, e.g. React Alicante 2018 > react-alicante-2018
3. Create a conference config file `data/conferences/yyyy-mm-dd-conference-name.yaml`
4. Commit changes and [create a pull request](https://help.github.com/articles/creating-a-pull-request/)

## Development

1. You need to set up a simple web server as JS modules in browsers don't work via local filesystem
2. Just `cd` into the root directory and run one of the servers:
   * PHP: `php -S 0.0.0.0:8080`
   * Python 2.x: `python -m SimpleHTTPServer 8080`
   * Python 3.x: `python -m http.server 8080`
   * Ruby: `ruby -run -e httpd . -p 8080`

## Tests

* Run `make test`
* Tests verify all config files have all required properties. Have a look at examples directory.
* Dependencies: Docker

## TODO

* Inline videos
* Add microdata
* Show date and location for individual talks
* Add filters for dates and locations to conference detail
* Add CI
* Make it PWA
