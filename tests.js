Date.prototype.getDateTimeString = function() {
    return this.getFullYear() +
        '-' + (this.getMonth() + 1) + '-' + this.getDate() +
        ' ' + this.toTimeString().replace(/ \S+/, '');
};

var dtl = null, result = null, current = new Date,
    currentTimezoneOffset = -current.getTimezoneOffset() / 60;

module("russian locale", {
    setup: function () {
        dtl = new LocalizedDate(currentTimezoneOffset, 'ru');
        ok(true, "LocalizedDate object with russian locale initialized successful");
    }
});

test( "только что", function() {
    result = dtl.localize(current.getDateTimeString());
    ok( (result == "только что") , result );
});

test( "минуты назад", function() {
    result = dtl.localize("2012-04-12 01:00:00", "2012-04-12 01:05:00");
    ok( (result == "5 минут назад") , result );
    result = dtl.localize("2012-04-12 01:00:00", "2012-04-12 01:41:00");
    ok( (result == "41 минуту назад") , result );
});

test( "через N минут", function() {
    result = dtl.localize("2012-04-12 01:05:00", "2012-04-12 01:00:00");
    ok( (result == "через 5 минут") , result );
    result = dtl.localize("2012-04-12 01:41:00", "2012-04-12 01:00:00");
    ok( (result == "через 41 минуту") , result );
});

test( "прошедшие года", function() {
    result = dtl.localize("2010-04-12 12:05:00");
    ok( (result == "12 апр 2010 в 12:05") , result );
    result = dtl.localize("1961-04-12 01:00:00");
    ok( (result == "12 апр 1961 в 01:00") , result );
});

test( "будущие года", function() {
    result = dtl.localize("2120-04-12 12:05:00");
    ok( (result == "12 апр 2120 в 12:05") , result );
    result = dtl.localize("3050-04-12 01:00:00");
    ok( (result == "12 апр 3050 в 01:00") , result );
});

test( "текущий год", function() {
    result = dtl.localize("2012-01-12 01:05:00", "2012-04-12 01:00:00");
    ok( (result == "12 янв в 01:05") , result );
});

test( "вчера", function() {
    result = dtl.localize("2012-04-11 01:05:00", "2012-04-12 01:00:00");
    ok( (result == "вчера в 01:05") , result );
});

test( "завтра", function() {
    result = dtl.localize("2012-04-13 01:05:00", "2012-04-12 01:00:00");
    ok( (result == "завтра в 01:05") , result );
});

module("english locale", {
    setup: function () {
        dtl = new LocalizedDate(currentTimezoneOffset, 'en');
        ok(true, "LocalizedDate object with english locale initialized successful");
    }
});

test( "at this moment", function() {
    result = dtl.localize(current.getDateTimeString());
    ok( (result == "at this moment") , result );
});

test( "minutes ago", function() {
    result = dtl.localize("2012-04-12 01:00:00", "2012-04-12 01:05:00");
    ok( (result == "5 minutes ago") , result );
    result = dtl.localize("2012-04-12 01:00:00", "2012-04-12 01:41:00");
    ok( (result == "41 minute ago") , result );
});

test( "after N minutes", function() {
    result = dtl.localize("2012-04-12 01:05:00", "2012-04-12 01:00:00");
    ok( (result == "after 5 minutes") , result );
    result = dtl.localize("2012-04-12 01:41:00", "2012-04-12 01:00:00");
    ok( (result == "after 41 minute") , result );
});

test( "past years", function() {
    result = dtl.localize("2010-04-12 12:05:00");
    ok( (result == "apr 12th 2010 at 12:05") , result );
    result = dtl.localize("1961-04-12 01:00:00");
    ok( (result == "apr 12th 1961 at 01:00") , result );
});

test( "future years", function() {
    result = dtl.localize("2120-04-12 12:05:00");
    ok( (result == "apr 12th 2120 at 12:05") , result );
    result = dtl.localize("3050-04-12 01:00:00");
    ok( (result == "apr 12th 3050 at 01:00") , result );
});

test( "current year", function() {
    result = dtl.localize("2012-01-12 01:05:00", "2012-04-12 01:00:00");
    ok( (result == "jan 12th at 01:05") , result );
});

test( "yesterday", function() {
    result = dtl.localize("2012-04-11 01:05:00", "2012-04-12 01:00:00");
    ok( (result == "yesterday at 01:05") , result );
});

test( "tomorrow", function() {
    result = dtl.localize("2012-04-13 01:05:00", "2012-04-12 01:00:00");
    ok( (result == "tomorrow at 01:05") , result );
});