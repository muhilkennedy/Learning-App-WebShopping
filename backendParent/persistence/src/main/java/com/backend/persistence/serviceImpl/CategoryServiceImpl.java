package com.backend.persistence.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.commons.collections4.CollectionUtils;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.entity.Category;
import com.backend.persistence.repository.CategoryRepository;
import com.backend.persistence.service.CategoryService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class CategoryServiceImpl  implements CategoryService{
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public void save(Category category) {
		categoryRepository.save(category);
	}
	
	@Override
	public void createCategory(Category category){
		category.setTenant(baseService.getTenantInfo());
		category.setActive(true);
		categoryRepository.save(category);
	}
	
	@Override
	public Category getCategoryById(Long id) {
		return categoryRepository.getCategoryById(baseService.getTenantInfo(), id);
	}
	
	@Override
	public List<Category> getAllCategoriesForTenant(){
		return categoryRepository.getAllCategory(baseService.getTenantInfo());
	}
	
	@Override
	public List<Category> getAllCategoriesForDelete(){
		return categoryRepository.getCategoriesForDelete(baseService.getTenantInfo());
	}
	
	@Override
	public List<Category> getAllBaseCategories(){
		return categoryRepository.getAllBaseCategory(baseService.getTenantInfo());
	}
	
	@Override
	public List<Category> getAllChildCategories(Long parentId){
		return categoryRepository.getCategoryChildren(baseService.getTenantInfo(), parentId);
	}
	
	@Override
	public Map getCategoriesRecursive(){
		List<Category> baseCategories = getAllBaseCategories();
		return getExplodedContentRecursive(baseCategories);
	}
	
	private Map getExplodedContentRecursive(List<Category> categories) throws JSONException {
		Map map = new HashMap();
		for(Category category : categories) {
			map.put(category.toString() , getExplodedContentRecursive(getAllChildCategories(category.getCategoryId())));
		}
		return (map.size()) > 0 ? map : null;
	}
	
	/**
	 * @param id
	 * we will only deactivate the category due to product constraints
	 */
	@Override
	public void deleteCategory(Long id) {
		Category category = categoryRepository.getCategoryById(baseService.getTenantInfo(), id);
		category.setActive(false);
		category.setMarkedForDelete(true);
		categoryRepository.save(category);
	}
	
	@Override
	public void deleteCategory(List<Long> ids) {
		CollectionUtils.emptyIfNull(ids).stream().forEach(id -> {
			deleteCategory(id);
		});
	}
	
	@Override
	public void updateCategoryName(Long id, String name){
		Category category = categoryRepository.getCategoryById(baseService.getTenantInfo(), id);
		category.setCategoryName(name);
		categoryRepository.save(category);
	}

}
