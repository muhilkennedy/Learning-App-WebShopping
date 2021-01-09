package com.backend.core.configuration;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import javax.sql.rowset.serial.SerialBlob;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.imgscalr.Scalr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import com.backend.core.dao.EmployeeDao;
import com.backend.core.dao.InvoiceDao;
import com.backend.core.entity.HomePageMedia;
import com.backend.core.entity.Tenant;
import com.backend.core.entity.TenantDetails;
import com.backend.core.security.RSAKeyPairGenerator;
import com.backend.core.service.HomeMediaService;
import com.backend.core.service.TenantService;
import com.backend.core.util.ConfigUtil;

/**
 * @author muhil
 *
 */
@Component
public class TenantInfoLoading {
	
	private Logger logger = LoggerFactory.getLogger(TenantInfoLoading.class);
	
	@Autowired
	private TenantProperties tenants;
	
	@Autowired
	private TenantService tenantService;
	
	@Autowired
	private HomeMediaService mediaService;
	
	@Autowired
	private EmployeeDao employeeDao;
	
	@Autowired
	private InvoiceDao invoiceDao;
	
	@Autowired
	private ConfigUtil  configUtil;
	
	/**
	 * This method is for dev purposes only. 
	 * In future ER can be done to implement default data to onboarded tenant.(has to be merged as single method)
	 */
	@PostConstruct
	private void loadTenantDetail() {
		try {
			if(!configUtil.isProdMode()) {
				//load Logo
				File file = ResourceUtils.getFile(
					      "classpath:devAssets/Brand-Icon.jpg");
				Tenant devTenant = tenantService.findTenantByID("devTenant");
				TenantDetails devTenantDetail = devTenant.getTenantDetail();
				byte[] test = FileUtils.readFileToByteArray(file);
				devTenantDetail.setTenantLogo(new SerialBlob(test));
				
				//load Home Media
				file = ResourceUtils.getFile(
					      "classpath:devAssets/slider1.jpg");
				// home slider images
				HomePageMedia media = mediaService.getMediaById(devTenant, 1);
				media.setImage(new SerialBlob(getBannerImage(FileUtils.readFileToByteArray(file))));
				mediaService.save(media);
				
				file = ResourceUtils.getFile(
					      "classpath:devAssets/slider2.jpg");
				media = mediaService.getMediaById(devTenant, 2);
				media.setImage(new SerialBlob(getBannerImage(FileUtils.readFileToByteArray(file))));
				mediaService.save(media);
				
				file = ResourceUtils.getFile(
					      "classpath:devAssets/Media1.jpg");
				media = mediaService.getMediaById(devTenant, 3);
				media.setImage(new SerialBlob(getHomeImage(FileUtils.readFileToByteArray(file))));
				mediaService.save(media);
				
				file = ResourceUtils.getFile(
					      "classpath:devAssets/Mediator2.jpg");
				media = mediaService.getMediaById(devTenant, 4);
				media.setImage(new SerialBlob(getHomeImage(FileUtils.readFileToByteArray(file))));
				mediaService.save(media);
				
				tenantService.save(devTenant);
			}
		} catch (Exception e) { 
			logger.error("Exception in loading dev images - " + e.getMessage());
		}		
	}
	//conversion to reduce image size and load faster
	private byte[] getBannerImage(byte[] image) throws Exception {
		InputStream in = new ByteArrayInputStream(image);
		BufferedImage bImage = Scalr.resize(ImageIO.read(in), Scalr.Method.AUTOMATIC, Scalr.Mode.AUTOMATIC, 1900,
				1700, Scalr.OP_ANTIALIAS);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(bImage, "jpg", baos);
		return baos.toByteArray();
	}
	
	private byte[] getHomeImage(byte[] image) throws Exception {
		InputStream in = new ByteArrayInputStream(image);
		BufferedImage bImage = Scalr.resize(ImageIO.read(in), Scalr.Method.AUTOMATIC, Scalr.Mode.AUTOMATIC, 1200,
				900, Scalr.OP_ANTIALIAS);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(bImage, "jpg", baos);
		return baos.toByteArray();
	}
	
	/**
	 * Load Tenant/realm details from properties file and load into DB.
	 * @throws Exception 
	 */
	@PostConstruct
	private void loadRealmInformation() throws Exception {
		logger.info("loading Tenant/Realm information");
		Map<String, Tenant> tenantMap = getTenantMap();
		for (String tenant : tenants.getRealm()) {
			String[] tenantDetails = tenant.split(",");
			Tenant realm = tenantMap.get(tenantDetails[1].trim());
			if (realm != null) {
				realm.setUniqueName(tenantDetails[0].trim());
				realm.setActive(Boolean.parseBoolean(tenantDetails[2].trim()));
				realm.setPurge(Boolean.parseBoolean(tenantDetails[4].trim()));
			} else {
				realm = new Tenant(tenantDetails[1].trim(), tenantDetails[0].trim(),
						Boolean.parseBoolean(tenantDetails[2].trim()), Boolean.parseBoolean(tenantDetails[4].trim()));
			}
			String originsList = tenantDetails[3].trim().replace("[", "").replace("]", "");
			RSAKeyPairGenerator rsa = new RSAKeyPairGenerator();
			realm.setPublicKey(rsa.getPublicKey());
			realm.setPrivateKey(rsa.getPrivateKey());
			tenantService.saveAndFlush(realm);
			resetOriginList(realm, originsList);
			tenantMap.remove(tenantDetails[1].trim());
			realm = tenantService.findTenantByID(realm.getTenantID());
			TenantDetails additionalTenantDetails = realm.getTenantDetail();
			if(additionalTenantDetails == null) {
				TenantDetails newTenantDetail = new TenantDetails();
				newTenantDetail.setTenantID(realm);
				tenantService.saveTenantDetail(newTenantDetail);
			}
			logger.info("loaded tenant -> " + realm.getUniqueName());
			if(!employeeDao.isCustomerSupportAdminPresent(realm.getTenantID())) {
				employeeDao.createAdminUserForTenant(realm.getTenantID());
			}
			if (!invoiceDao.containsInvoiceTemplate(realm.getTenantID())) {
				ClassPathResource classPathResource = new ClassPathResource("invoiceTemplate/Invoice-Template.docx");
				InputStream inputStream = classPathResource.getInputStream();
				File file = File.createTempFile("invoice", ".docx");
				try {
					FileUtils.copyInputStreamToFile(inputStream, file);
				} finally {
					IOUtils.closeQuietly(inputStream);
				}
				
				ClassPathResource classPathResourcePos = new ClassPathResource("invoiceTemplate/POS-Template.docx");
				InputStream is = classPathResourcePos.getInputStream();
				File posFile = File.createTempFile("invoice", ".docx");
				try {
					FileUtils.copyInputStreamToFile(is, posFile);
				} finally {
					IOUtils.closeQuietly(is);
				}

				invoiceDao.createInvoiceTemplate(realm.getTenantID(),
						new SerialBlob(FileUtils.readFileToByteArray(file)), new SerialBlob(FileUtils.readFileToByteArray(posFile)));
				
				deleteDirectoryOrFile(file);
				deleteDirectoryOrFile(posFile);
			}
		}
		// remaining tenants are considered removed.
		if (!tenantMap.isEmpty()) {
			tenantMap.entrySet().parallelStream().forEach(tenant -> {
				tenant.getValue().setPurge(false);
				tenantService.save(tenant.getValue());
				logger.info("Tenant Deactivated -> " + tenant.getValue().getUniqueName());
			});
		}
	}
	
	private boolean deleteDirectoryOrFile(File dir) {
		if(dir != null) {
			if (dir.isDirectory()) {
				File[] children = dir.listFiles();
				for (int i = 0; i < children.length; i++) {
					boolean success = deleteDirectoryOrFile(children[i]);
					if (!success) {
						return false;
					}
				}
			}
			logger.info("Removing Dir - " + dir.getPath());
			return dir.delete();
		}
		return false;
	}
	
	private Map<String, Tenant> getTenantMap() {
		List<Tenant> tenantList = tenantService.getAllTenants();
		Map<String, Tenant> tenantMap = new HashMap<String, Tenant>();
		tenantList.parallelStream().forEach(tenant -> {
			tenantMap.put(tenant.getTenantID(), tenant);
		});
		return tenantMap;
	}
	
	private void resetOriginList(Tenant realm, String originsList) throws Exception {
		String[] allowedOrigins = originsList.split("\\|");
		if(tenantService.findTenantByID(realm.getTenantID()) != null) {
			tenantService.removeOrigins(realm.getTenantID());
			for (String origin : allowedOrigins) {
				tenantService.addAllowedOrigin(realm.getTenantID(), origin);
			}
		}
	}

}
