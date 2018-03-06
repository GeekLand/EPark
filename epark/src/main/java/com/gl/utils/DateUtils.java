package com.gl.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

/**
 * 日期处理工具类
 * 
 * @author weiguangming
 *
 */
public class DateUtils {

	/**
	 * 获取 时间date (yyyyMMddHHmmss)
	 * 
	 * @return
	 */
	public static String getDBNowDateStr(Date date) {
		return new SimpleDateFormat("yyyyMMddHHmmss").format(date);
	}

	/**
	 * 获取时间date (yyyyMMdd)
	 * 
	 * @return
	 */
	public static String getDBNowDate(Date date) {
		return new SimpleDateFormat("yyyyMMdd").format(date);
	}

	/**
	 * 获取 时间date当天的开始时刻 (yyyyMMdd000000)
	 * 
	 * @return
	 */
	public static String getTodayBeginTimeStr(Date date) {
		return new SimpleDateFormat("yyyyMMdd").format(date) + "000000";
	}

	/**
	 * 获取 时间date当天的结束时刻 (yyyyMMdd235959)
	 * 
	 * @return
	 */
	public static String getTodayEndTimeStr(Date date) {
		return new SimpleDateFormat("yyyyMMdd").format(date) + "235959";
	}

	/**
	 * 将日期date以字符串format的格式转换
	 * 
	 * @param date
	 * @param formate
	 * @return
	 */
	public static String format(Date date, String format) {
		return new SimpleDateFormat(format).format(date);
	}

	/**
	 * 获取 日期date的上一个月 (yyyyMM)
	 * 
	 * @return
	 */
	public static String getLastMonth(Date date) {
		int year = Integer.parseInt(DateUtils.format(date, "yyyy"));
		int month = Integer.parseInt(DateUtils.format(date, "MM"));
		if (month == 1) {
			year--;
			month = 12;
		} else {
			month--;
		}
		String lastMonth = "";
		while (month < 10) {
			lastMonth = "0" + month;
			break;
		}
		return year + lastMonth;
	}

	/**
	 * 去除日期字符串的分割符 ('/','-')
	 * 
	 * @param date
	 * @return
	 */
	public static String removeDecollatorForDate(String date) {
		if (StringUtils.isBlank(date)) {
			return date;
		}
		String[] strs = date.split("[/-]");
		String result = "";
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < strs.length; i++) {
			String str = strs[i];
			if ((i == 1 || i == 2) && str.length() == 1) {
				sb.append("0").append(str);
			} else {
				sb.append(str);
			}
		}
		result = sb.toString();
		return result;
	}

	/**
	 * 去除时间的分割符('\s','-',':')
	 * 
	 * @param time
	 * @return
	 */
	public static String removeDecollatorForTime(String time) {
		if (StringUtils.isBlank(time)) {
			return time;
		}
		return time.replaceAll("[\\s-:]", "");
	}

	/**
	 * 获取 日期date的星期名
	 * 
	 * @param date
	 * @return
	 */
	public static String getWeek(Date date) {
		String[] weeks = { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" };
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int week_index = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if (week_index < 0) {
			week_index = 0;
		}
		return weeks[week_index];
	}

	/**
	 * 获取 当前日期 month(字符串)的 下一个月日期形式(yyyyMM)
	 * 
	 * @param month
	 * @return
	 */
	public static String getNextMonth(String month) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		String result = "";
		try {
			Date date = sdf.parse(month);
			Calendar c = Calendar.getInstance();
			c.setTime(date);
			c.add(Calendar.MONTH, +1);
			Date next = c.getTime();
			result = sdf.format(next);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 获取当前日期的前一天 yyyyMMdd
	 * 
	 * @param dateStr
	 * @return
	 */
	public static String getLastDay(String dateStr) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		String result = "";
		try {
			Date date = sdf.parse(dateStr);
			Calendar c = Calendar.getInstance();
			c.setTime(date);
			c.add(Calendar.DATE, -1);
			Date next = c.getTime();
			result = sdf.format(next);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 将dateStr 按 format模式转为 Date类型
	 * 
	 * @param dateStr
	 * @param format
	 * @return
	 */
	public static Date formatDateFromString(String dateStr, String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		Date result = null;
		try {
			Date date = sdf.parse(dateStr);
			Calendar c = Calendar.getInstance();
			c.setTime(date);
			result = c.getTime();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

}
