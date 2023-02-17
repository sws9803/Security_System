package com.senkorea.util;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class SysUtil {

	public static boolean isNull(String value) {
		return (value == null) || "".equals(value);
	}

	public static String objToStr(Object value) {
		try {
			return value.toString();
		} catch (Exception e) {
			return "";
		}
	}

	public static String boolToStr(boolean value) {
		try {
			return Boolean.toString(value);
		} catch (Exception e) {
			return "";
		}
	}

	public static boolean strToBool(String value) {
		try {
			return Boolean.parseBoolean(value);
		} catch (Exception e) {
			return false;
		}
	}

	public static byte[] intToBytes(int value) {
		try {
			ByteBuffer buffer = ByteBuffer.allocate(4);
			buffer.putInt(value);
			buffer.order(ByteOrder.BIG_ENDIAN);
			return buffer.array();
		} catch (Exception e) {
			return new byte[] { 0, 0, 0, 0 };
		}
	}

	public static String intToStr(int value) {
		try {
			return Integer.toString(value);
		} catch (Exception e) {
			return "";
		}
	}

	public static int strToInt(String value) {
		try {
			return Integer.parseInt(value);
		} catch (Exception e) {
			return 0;
		}
	}

	public static String longToStr(long value) {
		try {
			return Long.toString(value);
		} catch (Exception e) {
			return "";
		}
	}

	public static long strToLong(String value) {
		try {
			return Long.parseLong(value);
		} catch (Exception e) {
			return 0;
		}
	}

	public static String floatToStr(float value) {
		try {
			return Float.toString(value);
		} catch (Exception e) {
			return "";
		}
	}

	public static float strToFloat(String value) {
		try {
			return Float.parseFloat(value);
		} catch (Exception e) {
			return 0;
		}
	}

	public static String doubleToStr(double value) {
		try {
			return Double.toString(value);
		} catch (Exception e) {
			return "";
		}
	}

	public static double strToDouble(String value) {
		try {
			return Double.parseDouble(value);
		} catch (Exception e) {
			return 0;
		}
	}

	public static String dttmToStr(Date dttm) {
		return dttmToStr(dttm, "yyyyMMddHHmmss");
	}

	public static String dttmToStr(Date dttm, String pattern) {
		SimpleDateFormat sdf1 = new SimpleDateFormat(pattern, Locale.KOREA);
		try {
			return sdf1.format(dttm);
		} catch (Exception e1) {
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd", Locale.KOREA);
			try {
				return sdf1.format(sdf2.parse("19000101000000"));
			} catch (Exception e2) {
				return "";
			}
		}
	}

	public static String dttmToStr(String dttm) {
		return dttmToStr(dttm, "yyyyMMddHHmmss");
	}

	public static String dttmToStr(String dttm, String pattern) {
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA);
		SimpleDateFormat sdf2 = new SimpleDateFormat(pattern, Locale.KOREA);
		try {
			return sdf2.format(sdf1.parse(dttm));
		} catch (Exception e1) {
			try {
				return sdf2.format(sdf1.parse("19000101000000"));
			} catch (Exception e2) {
				return "";
			}
		}
	}

	public static Date strToDttm(String dttm) {
		return strToDttm(dttm, "yyyyMMddHHmmss");
	}

	public static Date strToDttm(String dttm, String pattern) {
		SimpleDateFormat sdf1 = new SimpleDateFormat(pattern, Locale.KOREA);
		try {
			return sdf1.parse(dttm);
		} catch (Exception e1) {
			try {
				return sdf1.parse("19000101000000");
			} catch (Exception e2) {
				return null;
			}
		}
	}

	public static String dateToStr(Date date) {
		return dateToStr(date, "yyyyMMdd");
	}

	public static String dateToStr(Date date, String pattern) {
		SimpleDateFormat sdf1 = new SimpleDateFormat(pattern, Locale.KOREA);
		try {
			return sdf1.format(date);
		} catch (Exception e1) {
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd", Locale.KOREA);
			try {
				return sdf1.format(sdf2.parse("19000101"));
			} catch (Exception e2) {
				return "";
			}
		}
	}

	public static String dateToStr(String date) {
		return dateToStr(date, "yyyyMMdd");
	}

	public static String dateToStr(String date, String pattern) {
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMdd", Locale.KOREA);
		SimpleDateFormat sdf2 = new SimpleDateFormat(pattern, Locale.KOREA);
		try {
			return sdf2.format(sdf1.parse(date));
		} catch (Exception e1) {
			try {
				return sdf2.format(sdf1.parse("19000101"));
			} catch (Exception e2) {
				return "";
			}
		}
	}

	public static Date strToDate(String date) {
		return strToDate(date, "yyyyMMdd");
	}

	public static Date strToDate(String date, String pattern) {
		SimpleDateFormat sdf1 = new SimpleDateFormat(pattern, Locale.KOREA);
		try {
			return sdf1.parse(date);
		} catch (Exception e1) {
			try {
				return sdf1.parse("19000101");
			} catch (Exception e2) {
				return null;
			}
		}
	}

	public static Date getDate(int year, int month, int day) {
		try {
			Calendar cal = Calendar.getInstance();
			cal.set(year, month, day);

			return cal.getTime();
		} catch (Exception e) {
			return null;
		}
	}

	public static Date getDate(int year, int month, int day, int hour, int minute) {
		try {
			Calendar cal = Calendar.getInstance();
			cal.set(year, month, day);
			cal.set(Calendar.HOUR_OF_DAY, hour);
			cal.set(Calendar.MINUTE, minute);

			return cal.getTime();
		} catch (Exception e) {
			return null;
		}
	}

	public static byte[] longToBCD(long value) {
		return longToBCD(value, -1);
	}

	public static byte[] longToBCD(long value, int len) {
		int byteLen = len;

		try {
			int digits = 0;

			long temp = value;
			while (temp != 0) {
				digits++;
				temp /= 10;
			}

			if (len == -1) {
				byteLen = digits % 2 == 0 ? digits / 2 : (digits + 1) / 2;
			} else {
				byteLen = len % 2 == 0 ? len / 2 : (len + 1) / 2;
			}

			byte bcd[] = new byte[byteLen];

			for (int i = 0; i < digits; i++) {
				byte tmp = (byte) (value % 10);

				if (i % 2 == 0) {
					bcd[i / 2] = tmp;
				} else {
					bcd[i / 2] |= (byte) (tmp << 4);
				}

				value /= 10;
			}

			for (int i = 0; i < byteLen / 2; i++) {
				byte tmp = bcd[i];
				bcd[i] = bcd[byteLen - i - 1];
				bcd[byteLen - i - 1] = tmp;
			}

			return bcd;
		} catch (Exception e) {
			return byteLen != -1 ? new byte[byteLen] : null;
		}
	}

	public static long bcdToLong(byte value) {
		try {
			return Long.valueOf(bcdToStr(value));
		} catch (Exception e) {
			return 0;
		}
	}

	public static long bcdToLong(byte[] value) {
		try {
			return Long.valueOf(bcdToStr(value));
		} catch (Exception e) {
			return 0;
		}
	}

	public static String bcdToStr(byte value) {
		try {
			StringBuffer sb = new StringBuffer();

			byte high = (byte) (value & 0xf0);
			high >>>= (byte) 4;
			high = (byte) (high & 0x0f);
			byte low = (byte) (value & 0x0f);

			sb.append(high);
			sb.append(low);

			return sb.toString();
		} catch (Exception e) {
			return "";
		}
	}

	public static String bcdToStr(byte[] value) {
		try {
			StringBuffer sb = new StringBuffer();

			for (int i = 0; i < value.length; i++) {
				sb.append(bcdToStr(value[i]));
			}

			return sb.toString();
		} catch (Exception e) {
			return "";
		}
	}

}
