<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Ruby Check Action

Run `ruby -wc` and anotate it with [Problem Matchers](https://github.com/actions/toolkit/blob/f0b00fd201c7ddf14e1572a10d5fb4577c4bd6a2/packages/core/README.md)
This action is useful when you want to detect syntax errors of test skipped files in CI.

## Usage

### basic

```yaml
name: test

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.2
      - uses: marocchino/ruby-check-action@v2
```

### report error only

```yaml
name: test

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.2
      - uses: marocchino/ruby-check-action@v2
        with:
          switch: '-c'
```

### smaller scope of paths

```yaml
name: test

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.2
      - uses: marocchino/ruby-check-action@v2
        with:
          paths: |
            lib/**/*.rb
            db/**/*.rb
            config/**/*.rb
```

## Inputs

### `switch`

**Optional**, Switch that pass to ruby. This defaults to `-wc`.

### `paths`

**Optional**, Filters the path of ruby files.
If value need to be more than one line, it should be multiline string not an array.
This defaults to `**/*.rb`.

### `GITHUB_TOKEN`

**Optional**, You can set [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) here. If not set, this will use `${{ github.token }}`.

## Outputs

None

## Any problem?

Feel free to report issues. 😃
