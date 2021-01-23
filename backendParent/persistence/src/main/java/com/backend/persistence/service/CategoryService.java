package com.backend.persistence.service;

import java.util.List;
import java.util.Map;

import com.backend.persistence.entity.Category;

public interface CategoryService {

	void save(Category category);

	void createCategory(Category category);

	List<Category> getAllCategoriesForTenant();

	Category getCategoryById(Long id);

	List<Category> getAllBaseCategories();

	List<Category> getAllChildCategories(Long parentId);

	Map getCategoriesRecursive();

	void deleteCategory(Long id);

	void deleteCategory(List<Long> ids);

	void updateCategoryName(Long id, String name);

	List<Category> getAllCategoriesForDelete();

}
