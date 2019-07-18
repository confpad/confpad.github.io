# ⚡️ ConfPad

## How to add a conference

1. [Fork project](https://help.github.com/articles/fork-a-repo/)
2. Create a conference config file `data/conferences/yyyy/yyyy-mm-dd-<slugified-conference-name>.yaml`
3. [Create a pull request](https://help.github.com/articles/creating-a-pull-request/)

For a more detailed description see [CONTRIBUTING.MD](CONTRIBUTING.md).


## Development

Dependencies: Docker, Docker Compose


### Develop

```shell
# Run project on localhost:8080
make develop
```


### Tests

```shell
# Test all files
make test

# Test a single file
make test-single TESTFILE=2018-06-02-jsconf-eu-2018.yaml
```
