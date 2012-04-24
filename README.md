# LocalizedDate.JS
## Version 0.6

### Using
```js
/**
 * new LocalizedDate(SERVER_TIMEZONE_OFFSET, [LOCALE])
 *
 * integer SERVER_TIMEZONE - server timezone offset (e.g. 4 for Europe/Moscow)
 * string LOCALE - user locale, 2 chars (e.g. ru, en)
 * Only ru and en locale supported in this version
 * For ua, kz and by locale set automatic as ru
 * If LOCALE undefined - script will detect locale automatical
 *
 * Method - localize(SERVER_DATETIME_STRING, [TESTING_DATETIME_STRING])
 * SERVER_DATETIME_STRING - target datetime string
 * TESTING_DATETIME_STRING - set current datetime as (for tests only)
 */

var ldt = new LocalizedDate(4); // timezone Europe/Moscow, locale autodetect
console.log(ldt.localize('2012-04-23 00:40:29'));
```