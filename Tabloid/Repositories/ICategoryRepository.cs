﻿using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();

        void AddCategory(Category category);

        void DeleteCategory(int categoryId);

        Category GetCategoryById(int id);

        void EditCategory(Category category);
    }
}