# Site Watcher

This is a code example for a presentation on [Bunyan](https://github.com/trentm/node-bunyan).

This service scrapes webpages periodically capturing images of them, and their HTML. It uses postgres as a persistance layer.

## Setup

```bash
$ yarn install
$ createdb sitewatcher
$ yarn knex migrate:latest
```

## Web API

```js
router
  .get("/", list)
  .post("/", create)
  .delete("/:id", destroy)
  .get("/:id/scrapes", listScrapes)
  .get("/:id/scrapes/:scrapeId.png", screenshot)
  .get("/:id/scrapes/:scrapeId.html", html);
```

## Running processes

```bash
$ yarn start # starts http servier
$ yarn worker # runs a single pass through pages to scrape
```

## Data Model

```
                                    ┌─────────────────────┐
┌───────────────────┐               │# Scrape             │░
│# Page             │░              │                     │░
│                   │░              │- id                 │░
│- id               │░              │- created_at         │░
│- created_at       │░             ╱│- updated_at         │░
│- updated_at       │────────────┼──│- page_id            │░
│- url              │░             ╲│- html               │░
│- enabled          │░              │- hash               │░
│                   │░              │- screenshot         │░
│                   │░              │                     │░
└───────────────────┘░              └─────────────────────┘░
 ░░░░░░░░░░░░░░░░░░░░░               ░░░░░░░░░░░░░░░░░░░░░░░
```

## Logging Resources

[This](http://www.masterzen.fr/2013/01/13/the-10-commandments-of-logging/) article is good
