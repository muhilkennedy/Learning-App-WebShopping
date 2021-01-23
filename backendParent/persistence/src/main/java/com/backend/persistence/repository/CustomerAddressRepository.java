package com.backend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.persistence.entity.CustomerAddress;

/**
 * @author Muhil
 *
 */
public interface CustomerAddressRepository extends JpaRepository<CustomerAddress, Long> {

}
