package com.backend.core.service;

import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import com.backend.core.entity.HomePageMedia;
import com.backend.core.entity.Tenant;

public interface HomeMediaService {

	List<HomePageMedia> getHomeMediaContents();

	HomePageMedia getMediaById(Long id);

	HomePageMedia getMediaById(Tenant tenant, Long id);

	void save(HomePageMedia media);

	void delete(Long id);

	void addMedia(byte[] image, String title, String description, boolean shopNow, boolean contact, boolean slider,
			String message) throws SerialException, SQLException;

	void updateMedia(Long id, byte[] image, String title, String description, boolean shopNow, boolean contact,
			boolean slider, String message) throws SerialException, SQLException;

	int getHomePageMediaCount();

}
