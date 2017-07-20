# express-elastic-sanitize

[![Circle CI](https://circleci.com/gh/riipen/express-elastic-sanitize.svg?style=svg)](https://circleci.com/gh/riipen/express-elastic-sanitize)

[![npm install --save express-elastic-sanitize](https://nodei.co/npm/express-elastic-sanitize.png)](https://npmjs.org/package/express-elastic-sanitize)

A sanitization middleware for Express targeting Elasticsearch.

## Purpose

Used for stripping out special characters from all request parameters, thus avoiding basic
injection attacks through invalid parameters.

## Installation

```bash
$ npm install --save express-elastic-sanitize
```

## Usage

```bash
import sanitizer from 'express-elastic-sanitize';

...

app.get(sanitizer)

...
```
