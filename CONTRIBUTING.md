# How to contribute

🎉 First off, thanks for taking the time to contribute! 🎉


## Conferences


### Adding conference

Let's say you want to add conference **React Conf 2018** that took place on **October 25 & 26**.

1. [Fork the project](https://help.github.com/articles/fork-a-repo/)
2. Create file `data/conferences/2018/2018-10-25-react-conf-2018.yaml`
   * `2018-10-25` - first day of the conference
   * `react-conf-2018` - slugified name of the conference
3. Follow the [styleguide](#styleguide).
4. [Create a pull request](https://help.github.com/articles/creating-a-pull-request/) named **Add 2018-10-25-react-conf-2018**.
5. After you submit your pull request, verify that all status checks are passing.


### Updating conference

Let's say you want to update some info for conference **React Conf 2018**.

1. [Fork the project](https://help.github.com/articles/fork-a-repo/)
2. Follow the [styleguide](#styleguide).
3. [Create a pull request](https://help.github.com/articles/creating-a-pull-request/) named **Update 2018-10-25-react-conf-2018**.
4. After you submit your pull request, verify that all status checks are passing.


### What if the status checks are failing?

Check the build log - it contains useful information on what's going wrong (look for the word_FAIL_). If it doesn't help please verify that the submitted file is a valid YAML: https://yaml-online-parser.appspot.com/ If still in doubt - ask me.


## Styleguide


### Minimal config

Note that `talks` part is optional.

```yaml
conference:

  name: React Conf 2018
  status: incomplete
  series: reactjs.org
  tags:
    -
    -
    -
  links:
    playlist:
    twitter:
    youtube:
    website:
  date:
    from: 2018-10-25
    to: 2018-10-26
  location:
  description:

talks:

  - title: React Today and Tomorrow
    lang: en
    type: regular
    time: 2018-10-25
    authors:
    slides:
    videos:
    description:
```


### Full config

```yaml
conference:

  name: React Conf 2018
  status: complete
  series: reactjs.org
  tags:
    - javascript
    - react
    -
  links:
    playlist: https://www.youtube.com/playlist?list=PLPxbbTqCLbGE5AihOSExAa4wUM-P42EIJ
    twitter: reactjs
    youtube: UCz5vTaEhvh7dOHEyd1efcaQ
    website: https://conf.reactjs.org/
  date:
    from: 2018-10-25
    to: 2018-10-26
  location:
    country: United States
    city: Henderson, NV
  description: |-
    React Conf 2018 is the official Facebook React event. This year's event will be held in Henderson, Nevada.

talks:

  - title: React Today and Tomorrow
    lang: en
    type: regular
    time: 2018-10-25 09:30:00
    authors:
      - name: Sophie Alpert
        twitter: sophiebits
        github: sophiebits
        website: https://sophiebits.com/
      - name: Dan Abramov
        twitter: dan_abramov
        github: gaearon
        website: https://overreacted.io/
    slides:
      - https://slides.com/danabramov/react-today-and-tomorrow
    videos:
      - https://youtu.be/V-QO-KO90iQ
    description: |-
      Let's see where's React today and where it's going to…
```


### All fields explained

* `conference`
  * Type: _required_
  * Value:
  * Description: object containing information about conference itself
* `conference.name`
  * Type: _required_
  * Value: _free-form string_
  * Description: conference name
* `conference.status`
  * Type: _required_
  * Value: _[complete, incomplete]_
  * Description: if all talks are present `complete` otherwise `incomplete`.
* `conference.series`
  * Type: _required_
  * Value: _slugified string_
  * Description: stripped domain name, used to match other seasons
* `conference.tags`
  * Type: _optional_
  * Value: _array of slugs_
  * Description: see [INFO_TAGS_VALUES](test/conferences.test.js) in `test/conferences.test.js`
* `conference.links.playlist`
  * Type: _optional_
  * Value: _URL_
  * Description: playlist URL (on YouTube, Vimeo, …)
* `conference.links.twitter`
  * Type: _optional_
  * Value: _slugified string_
  * Description: official conference Twitter ID
* `conference.links.youtube`
  * Type: _optional_
  * Value: _free-form string_
  * Description: YouTube channel ID
* `conference.links.website`
  * Type: _optional_
  * Value: _URL_
  * Description: official conference website
* `conference.date.from`
  * Type: _required_
  * Value: _date_
  * Description: first day of the conference in format `yyyy-mm-dd`
* `conference.date.to`
  * Type: _required_
  * Value: _date_
  * Description: last day of the conference in format `yyyy-mm-dd`
* `conference.location.country`
  * Type: _optional_
  * Value: _free-form string_
  * Description: country the talk is taking place in, see [test/countries.json](test/countries.json)
* `conference.location.city`
  * Type: _optional_
  * Value: _free-form string_
  * Description: city the talk is taking place in
* `conference.description`
  * Type: _optional_
  * Value: _free-form string_
  * Description: one-line description of the conference
* `talks`
  * Type: _optional_
  * Value:
  * Description: array of talks
* `talks.title`
  * Type: _required_
  * Value: _free-form string_
  * Description: title/name of the talk
* `talks.lang`
  * Type: _required_
  * Value: _ISO 639-1 string_
  * Description: language the talk is given in, see [test/iso-639-1.json](test/iso-639-1.json)
* `talks.type`
  * Type: _required_
  * Value: _[regular, lightning, workshop]_
  * Description: type of the talks
* `talks.time`
  * Type: _required_
  * Value: _date or datetime_
  * Description: `yyyy-dd-mm` or `yyyy-dd-mm hh:mm:ss`
* `talks.room`
  * Type: _optional_
  * Value: _free-form string_
  * Description: room/hall/auditorium name
* `talks.authors`
  * Type: _optional_
  * Value:
  * Description: array of authors
* `talks.authors.name`
  * Type: _optional_
  * Value: _free-form string_
  * Description: name and surname
* `talks.authors.twitter`
  * Type: _optional_
  * Value: _slugified string_
  * Description: Twitter ID
* `talks.authors.github`
  * Type: _optional_
  * Value: _slugified string_
  * Description: GitHub ID
* `talks.authors.website`
  * Type: _optional_
  * Value: _URL_
  * Description: author's web, must start with http:// or https://
* `talks.slides`
  * Type: _optional_
  * Value: _array of URLs_
  * Description: every entry must start with http:// or https://
* `talks.videos`
  * Type: _optional_
  * Value: _array of URLs_
  * Description: every entry must start with https://youtu.be/, https://vimeo.com/, or for other services an arbitrary URL starting with http:// or https:// is valid
* `talks.description`
  * Type: _optional_
  * Value: _free-form string_
  * Description: one-line description of the talk
