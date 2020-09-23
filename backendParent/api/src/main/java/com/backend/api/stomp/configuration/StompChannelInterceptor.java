package com.backend.api.stomp.configuration;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.map.MultiValueMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

import com.backend.core.service.BaseService;
import com.backend.core.util.Constants;
import com.backend.core.util.TenantUtil;


/**
 * @author Muhil kennedy
 * 
 * Read Stompclient headers here.
 *
 */
public class StompChannelInterceptor implements ChannelInterceptor {
	
	@Autowired
	private BaseService baseService;
	
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {

		MessageHeaders headers = message.getHeaders();
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

		Map<String, List> multiValueMap = headers.get(StompHeaderAccessor.NATIVE_HEADERS, Map.class);
		
		/*String tenantId = null;
		String origin = null;
		
		for (Map.Entry<String, List> entry : multiValueMap.entrySet()) {
			if(Constants.Header_TenantId.equals(entry.getKey())) {
				tenantId = entry.getValue().get(0).toString();
			}
			if(Constants.Header_Origin.equals(entry.getKey())) {
				origin = entry.getValue().get(0).toString();
			}
		}

		if (tenantId != null && origin != null && TenantUtil.isTenantActive(tenantId)
				&& TenantUtil.isAllowedOriginForTenant(tenantId, origin)) {
			baseService.setTenantInfo(TenantUtil.getTenantInfo(tenantId));
		}*/
		

		return message;
	}
}