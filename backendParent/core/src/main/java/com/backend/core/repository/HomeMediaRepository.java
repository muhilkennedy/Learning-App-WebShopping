package com.backend.core.repository;

import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.HomePageMedia;
import com.backend.core.entity.Tenant;

/**
 * @author Muhil
 *
 */
@Repository
public interface HomeMediaRepository extends JpaRepository<HomePageMedia, Integer> {
	
	String findAllMediaForTenantQuery = "select media from HomePageMedia media where media.tenantID = :tenantId";
	String findMediaByIdQuery = "select media from HomePageMedia media where media.tenantID = :tenantId and media.mediaId = :mediaId";
	String findHomePageMediaCountQuery = "select count(*) from HomePageMedia media where media.tenantID = :tenantId and media.sliderShow = false";
	String deleteMediaByIdQuery = "delete from HomePageMedia where tenantID = :tenantId and mediaId = :mediaId";
	
	@Query(findAllMediaForTenantQuery)
	List<HomePageMedia> findAllMediaForTenant(@Param("tenantId") Tenant tenantId);
	
	@Query(findMediaByIdQuery)
	HomePageMedia findMediaById(@Param("tenantId") Tenant tenantId, @Param("mediaId") int mediaId);
	
	@Query(findHomePageMediaCountQuery)
	int findHomePageMediaCount(@Param("tenantId") Tenant tenantId);
	
	@Modifying
	@Cascade(CascadeType.DELETE)
	@Query(deleteMediaByIdQuery)
	void deleteMediaById(@Param("tenantId") Tenant tenantId, @Param("mediaId") int mediaId);

}
