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

    public static Date plusSeconds(Date date, Long duration){
        return Date.from(date.toInstant().plusSeconds(duration));
    }

    public static LocalDateTime toLocalDateTime(Date date){
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    public static Date toDate(LocalDateTime localDateTime){
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }
}
