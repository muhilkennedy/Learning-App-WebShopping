package com.backend.api.stomp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.stomp.model.BroadCastMessage;
import com.backend.api.stomp.model.ChatMessageDetail;
import com.backend.commons.util.JWTUtil;


/**
 * @author Muhil
 * 
 * broadcast messages but not a secure mode for private communication. one-way has to be implemented later!.
 *
 */
@RestController
public class StompController {
	
    @MessageMapping("/msg")
    @SendTo("/broadcastchat/sendMessage")
    public BroadCastMessage broadcastMessage(ChatMessageDetail message) throws Exception {
    	BroadCastMessage msg =  new BroadCastMessage();
    	if(JWTUtil.validateToken(message.getUserToken())) {
    		msg.setSender(message.getFrom());
    		msg.setReciever(message.getTo());
    		msg.setMessage(message.getMessage());
    		msg.setTenantId(message.getTenantId());
    	}
        return msg;
    }
}
