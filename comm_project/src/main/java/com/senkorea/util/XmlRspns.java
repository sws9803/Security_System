package com.senkorea.util;

public class XmlRspns {

	public static String getDt(String de, boolean startDt) {
		de = SysUtil.isNull(de) ? "" : de.replace("-", "");

		if (de.length() == 8) {
			if (startDt) {
				return de.substring(0, 8) + "000000";
			} else {
				return de.substring(0, 8) + "235959";
			}
		} else if (de.length() == 10) {
			if (startDt) {
				return de.substring(0, 10) + "0000";
			} else {
				return de.substring(0, 10) + "5959";
			}
		} else if (de.length() == 14) {
			return de;
		} else {
			return "";
		}
	}

	public static String toStrIds(String ids) {
		if (SysUtil.isNull(ids)) {
			return "";
		} else {
			String[] strs = ids.split(",");

			if (strs != null && strs.length > 0) {
				StringBuffer sb = new StringBuffer();

				for (int i = 0; i < strs.length; i++) {
					if (SysUtil.isNull(strs[i])) {
						continue;
					}
					sb.append(",'").append(strs[i]).append("'");
				}

				return sb.length() > 0 ? sb.toString().substring(1) : "";
			} else {
				return "";
			}
		}
	}

}
