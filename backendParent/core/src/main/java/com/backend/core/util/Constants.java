package com.backend.core.util;

public class Constants {

	public static final String Header_TenantId = "Tenant-Id";
	public static final String Header_Origin = "Origin";
	public static final String Header_Limit = "Limit";
	public static final String Header_Offset = "Offset";
	public static final String Header_Scope = "Scope";
	public static final String Header_RequestOrigin = "Request-Origin";
	public static final String Header_RequestFrom = "Request-From";

	public static final String Token_Bearer = "Bearer";
	
	public static final String Task_Status_Submitted = "Submitted";
	public static final String Task_Status_InProgress = "InProgress";
	public static final String Task_Status_Completed = "Completed";
	public static final String Task_Status_Failure = "Failed";
	
	public static final String DATETIMEFORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";
	public static final String DATETIMEFORMAT_1 = "dd MMM yyyy HH:mm:ss z";
	public static final String DATETIMEFORMAT_2 = "dd MMM";
	public static final String Timezone_UTC = "UTC";
	public static final String Timezone_GMT = "GMT";
	public static final String Timezone_IST = "IST";
	public static final String Asia_Calcutta = "Asia/Calcutta";
	
	public static final String[] IP_HEADER_CANDIDATES = {
            "X-Forwarded-For",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR"
    };

	
}
