package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.InvoiceTemplate;

/**
 * @author Muhil
 *
 */
@Repository
public interface InvoiceRepository extends JpaRepository<InvoiceTemplate, Integer> {
	
	String findInvoiceTemplateForTenantQuery = "select it from InvoiceTemplate it where it.tenant = :tenant and it.active = true";
	String findAllInvoiceTemplatesQuery = "select it from InvoiceTemplate it where it.tenant = :tenant";
	String findInvoiceTemplateByIdQuery = "select it from InvoiceTemplate it where it.tenant = :tenant and it.invoiceId = :invoiceId";
	
	@Query(findInvoiceTemplateForTenantQuery)
	InvoiceTemplate findInvoiceTemplateForTenant(@Param("tenant") Tenant realm);
	
	@Query(findAllInvoiceTemplatesQuery)
	List<InvoiceTemplate> findAllInvoiceTemplates(@Param("tenant") Tenant realm);
	
	@Query(findInvoiceTemplateByIdQuery)
	InvoiceTemplate findInvoiceTemplateById(@Param("tenant") Tenant realm, @Param("invoiceId") int invoiceId);

}
