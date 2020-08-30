package com.backend.persistence.service;

import java.util.List;
import java.util.Map;

import com.backend.persistence.entity.Category;

public interface CategoryService {

	void save(Category category);

	void createCategory(Category category);

	List<Category> getCategories();

	Category getCategoryById(int id);

	List<Category> getAllBaseCategories();

	List<Category> getAllChildCategories(int parentId);

	Map getCategoriesRecursive();

	void deleteCategory(int id);

	void deleteCategory(List<Integer> ids);

	void updateCategoryName(int id, String name);

}
