import Category from '../models/categoryModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } =req.body;
        if(!name) {
            return res.json({ error: 'Category name is required' });
        }
        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if(existingCategory) {
            return res.json({ error: 'Category already exists' });
        }
        // Create new category
        const category = await new Category({ name }).save();
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
})

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    // Check if category exists
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if category name is provided
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    // Get category id from params and remove it.
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export { createCategory, updateCategory, removeCategory, listCategory, readCategory }