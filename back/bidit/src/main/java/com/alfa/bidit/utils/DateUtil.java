package com.alfa.bidit.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
    // TODO This will be implemented based on need.
    public static Date now(){
        return Date.from(Instant.now());
    }

    public static Date plusHours(Date date, int hours){
        return toDate(toLocalDateTime(date).plusHours(hours));
    }

    public static Date plusDays(Date date, int days){
        return toDate(toLocalDateTime(date).plusDays(days));
    }

    public static Date plusSeconds(Date date, int seconds){
        return toDate(toLocalDateTime(date).plusSeconds(seconds));
    }

    public static Date plusMinutes(Date date, int minutes){
        return toDate(toLocalDateTime(date).plusMinutes(minutes));
    }

    public static Date plusYears(Date date, int years){
        return toDate(toLocalDateTime(date).plusYears(years));
    }

    public static LocalDateTime toLocalDateTime(Date date){
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    public static Date toDate(LocalDateTime localDateTime){
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }
}
