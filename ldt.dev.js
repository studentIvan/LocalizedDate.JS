var LocalizedDate;
LocalizedDate = function ()
{
    /**
     * Constructor
     *
     * @param server_timezone_offset
     * @param user_locale
     */
    function LocalizedDate(server_timezone_offset, user_locale) {
        this.tz = server_timezone_offset * 1 || -1;
        this.lang = user_locale || (navigator.language || navigator.systemLanguage ||
            navigator.userLanguage || "en").substr(0, 2).toLowerCase()
    }

    LocalizedDate.lang = "en";
    LocalizedDate.tz = -1;
    LocalizedDate.currentDate = new Date;
    LocalizedDate.targetDate = new Date;

    /**
     * Method localize
     *
     * @param server_datetime_string
     * @param testing_datetime_string
     * @return string
     */
    LocalizedDate.prototype.localize = function (server_datetime_string, testing_datetime_string)
    {
        if (typeof server_datetime_string == "undefined") return '';

        this.currentDate = testing_datetime_string ?
            (new Date(testing_datetime_string.replace(/(\d+)-(\d+)-(\d+)/, "$2/$3/$1"))) : (new Date);
        this.targetDate = new Date(server_datetime_string.replace(/(\d+)-(\d+)-(\d+)/, "$2/$3/$1"));

        this.targetDate.setTime(this.targetDate.getTime() +
            (this.tz - -this.currentDate.getTimezoneOffset() / 60) * 60 * 60 * 1e3);

        switch (this.lang)
        {
            case "ru":
            case "ua":
            case "kz":
            case "by":
                return this.localize_ru();
                break;

            case "en":
            default:
                return this.localize_en();
        }
    };

    LocalizedDate.prototype.localize_ru = function ()
    {
        var b = "",
            c = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
            z = ["одну", "две", "три", "четыре", "пять"],
            d = this.currentDate, e = this.targetDate, f, g, h;

        if (d.getFullYear() == e.getFullYear()) {
            if (d.getMonth() == e.getMonth()) {
                if (d.getDate() == e.getDate()) {
                    if (d.getHours() == e.getHours()) {
                        if (d.getMinutes() == e.getMinutes()) {
                            return "только что"
                        } else if (d.getMinutes() > e.getMinutes()) {
                            g = d.getMinutes() - e.getMinutes();
                            h = g % 100;
                            if (h >= 5 && h <= 20) {
                                f = ((typeof z[g - 1] != 'undefined') ? z[g - 1] : g) + " минут"
                            } else {
                                h = h % 10;
                                if (h == 1 && g == 1) {
                                    f = "минуту"
                                } else if (h == 1 && g > 1) {
                                    f = ((typeof z[g - 1] != 'undefined') ? z[g - 1] : g) + " минуту"
                                } else if (h >= 2 && h <= 4) {
                                    f = ((typeof z[g - 1] != 'undefined') ? z[g - 1] : g) + " минуты"
                                } else {
                                    f = g + " минут"
                                }
                            }
                            return f + " назад"
                        } else {
                            g = e.getMinutes() - d.getMinutes();
                            h = g % 100;
                            if (h >= 5 && h <= 20) {
                                f = ((typeof z[g - 1] != 'undefined') ? z[g - 1] : g) + " минут"
                            } else {
                                h = h % 10;
                                if (h == 1 && g == 1) {
                                    f = "минуту"
                                } else if (h == 1 && g > 1) {
                                    f = ((typeof z[g - 1] != 'undefined') ? z[g - 1] : g) + " минуту"
                                } else if (h >= 2 && h <= 4) {
                                    f = ((typeof z[g - 1] != 'undefined') ? z[g - 1] : g) + " минуты"
                                } else {
                                    f = g + " минут"
                                }
                            }
                            return "через " + f
                        }
                    } else if (d.getHours() == (e.getHours() + 1)) {
                        return "час назад"
                    } else if (d.getHours() == (e.getHours() - 1)) {
                        return "через час"
                    } else {
                        b += "сегодня "
                    }
                } else if (d.getDate() == e.getDate() + 1) {
                    b += "вчера "
                } else if (d.getDate() == e.getDate() - 1) {
                    b += "завтра "
                } else {
                    b += e.getDate() + " " + c[e.getMonth()] + " "
                }
            } else {
                b += e.getDate() + " " + c[e.getMonth()] + " "
            }
        } else {
            b += e.getDate() + " " + c[e.getMonth()] + " " + e.getFullYear() + " "
        }

        return b + "в " + (e.getHours().toString().length == 1 ? "0" + e.getHours() : e.getHours())
            + ":" + (e.getMinutes().toString().length == 1 ? "0" + e.getMinutes() : e.getMinutes());
    };

    LocalizedDate.prototype.localize_en = function ()
    {
        var b = "",
            c = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
            z = ["one", "two", "three", "four", "five"],
            d = this.currentDate, e = this.targetDate, f, g, h;

        if (d.getFullYear() == e.getFullYear()) {
            if (d.getMonth() == e.getMonth()) {
                if (d.getDate() == e.getDate()) {
                    if (d.getHours() == e.getHours()) {
                        if (d.getMinutes() == e.getMinutes()) {
                            return "at this moment"
                        } else if (d.getMinutes() > e.getMinutes()) {
                            g = d.getMinutes() - e.getMinutes();
                            h = g % 100;
                            if (h >= 5 && h <= 20) {
                                f = ((typeof z[g - 1] != 'undefined') ? z[g - 1] : g) + " minutes"
                            } else {
                                h = h % 10;
                                if (h == 1 && g == 1) {
                                    f = "a minute"
                                } else if ((h == 1 && g > 1) || (h >= 2 && h <= 4)) {
                                    f = ((typeof z[g - 1] != 'undefined') ? z[g - 1] : g) + " minute"
                                } else {
                                    f = g + " minutes"
                                }
                            }
                            return f + " ago"
                        } else {
                            g = e.getMinutes() - d.getMinutes();
                            h = g % 100;
                            if (h >= 5 && h <= 20) {
                                f = ((typeof z[g - 1] != 'undefined') ? z[g - 1] : g) + " minutes"
                            } else {
                                h = h % 10;
                                if (h == 1 && g == 1) {
                                    return "a minute"
                                } else if ((h == 1 && g > 1) || (h >= 2 && h <= 4)) {
                                    f = ((typeof z[g - 1] != 'undefined') ? z[g - 1] : g) + " minute"
                                } else {
                                    f = g + " minutes"
                                }
                            }
                            return "after " + f
                        }
                    } else if (d.getHours() == (e.getHours() + 1)) {
                        return "an hour ago"
                    } else if (d.getHours() == (e.getHours() - 1)) {
                        return "in an hour"
                    } else {
                        b += "today "
                    }
                } else if (d.getDate() == e.getDate() + 1) {
                    b += "yesterday "
                } else if (d.getDate() == e.getDate() - 1) {
                    b += "tomorrow "
                } else {
                    b += c[e.getMonth()] + " " + e.getDate() + "th "
                }
            } else {
                b += c[e.getMonth()] + " " + e.getDate() + "th "
            }
        } else {
            b += c[e.getMonth()] + " " + e.getDate() + "th " + e.getFullYear() + " "
        }

        return b + "at " + (e.getHours().toString().length == 1 ? "0" + e.getHours() : e.getHours())
            + ":" + (e.getMinutes().toString().length == 1 ? "0" + e.getMinutes() : e.getMinutes());
    };

    return LocalizedDate
}();