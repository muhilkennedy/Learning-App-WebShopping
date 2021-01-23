package com.backend.core.serviceImpl;

import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.entity.HomePageMedia;
import com.backend.core.entity.Tenant;
import com.backend.core.repository.HomeMediaRepository;
import com.backend.core.service.BaseService;
import com.backend.core.service.HomeMediaService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class HomeMediaServiceImpl implements HomeMediaService{

	@Autowired
	private BaseService baseService;
	
	@Autowired
	private HomeMediaRepository mediaRepo;
	
	@Override
	public void save(HomePageMedia media) {
		mediaRepo.save(media);
	}
	
	@Override
	public void delete(Long id) {
		mediaRepo.deleteMediaById(baseService.getTenantInfo(), id);
	}
	
	@Override
	public List<HomePageMedia> getHomeMediaContents() {
		return mediaRepo.findAllMediaForTenant(baseService.getTenantInfo());
	}
	
	@Override
	public int getHomePageMediaCount() {
		return mediaRepo.findHomePageMediaCount(baseService.getTenantInfo());
	}
	
	@Override
	public HomePageMedia getMediaById(Long id) {
		return mediaRepo.findMediaById(baseService.getTenantInfo(), id);
	}
	
	@Override
	public HomePageMedia getMediaById(Tenant tenant, Long id) {
		return mediaRepo.findMediaById(tenant, id);
	}
	
	@Override
	public void updateMedia(Long id, byte[] image, String title, String description, boolean shopNow, boolean contact,
			boolean slider, String message) throws SerialException, SQLException {
		HomePageMedia media = getMediaById(id);
		media.setContact(contact);
		media.setTitle(title);
		media.setDescription(description);
		media.setMessage(message);
		media.setShopNow(shopNow);
		media.setSliderShow(slider);
		media.setImage(new SerialBlob(image));
		mediaRepo.save(media);
	}
	
	@Override
	public void addMedia(byte[] image, String title, String description, boolean shopNow, boolean contact,
			boolean slider, String message) throws SerialException, SQLException {
		HomePageMedia media = new HomePageMedia(new SerialBlob(image), title, description, message, shopNow, contact, slider);
		media.setTenant(baseService.getTenantInfo());
		mediaRepo.save(media);
	}
	
}
