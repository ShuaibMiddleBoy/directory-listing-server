const ListingModel = require("../models/ListingModel");
const categoryModel = require("../models/categoryModel");

// Create Listing controller
const createListingController = async (req, res) => {
  try {
    const { category, titleName, websiteLink, phone, address, zipCode } = req.body;

    // Get the user's ID from req.user._id
    const userId = req.user._id;

    switch (true) {
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !titleName:
        return res.status(400).send({ error: "Title Name is Required" });
      case !websiteLink:
        return res.status(400).send({ error: "Website Link is Required" });
      case !phone:
        return res.status(400).send({ error: "Phone is Required" });
      case !address:
        return res.status(400).send({ error: "Address is Required" });
      case !zipCode:
        return res.status(400).send({ error: "Zip Code is Required" });
    }

    // Here, find the category by its name (string)
    const foundCategory = await categoryModel.findOne({ name: category });

    if (!foundCategory) {
      return res.status(404).send({ error: "Category not found" });
    }

    const listing = await new ListingModel({
      user: userId,
      category: foundCategory._id, // Use the ObjectId of the found category
      titleName,
      websiteLink,
      phone,
      address,
      zipCode,
    }).save();

    res.status(201).send({
      success: true,
      message: "New Listing Created",
      listing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Listing",
      error: error.message,
    });
  }
};

// Get all listings controller
const getAllListings = async (req, res) => {
  try {
    const listings = await ListingModel.find({}).populate('category');
    res.status(200).send({
      success: true,
      message: "Successfully showed All Listings",
      listings,
      totalLengthOfListings: listings.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all listings",
      error: error.message,
    });
  }
};

// Get single listing controller
const getSingleListing = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await ListingModel.findById(id).populate('category');
    
    if (!list) {
      return res.status(404).send({ error: "Listing not found" });
    }

    res.status(200).send({
      success: true,
      message: "Listing Showed Successfully!",
      list,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single listing",
      error: error.message,
    });
  }
};

// update listing  controller
// update listing  controller
const updateListingController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if the listing exists
    const listingExists = await ListingModel.exists({ _id: id });
    if (!listingExists) {
      return res.status(404).send({ 
        success: false, 
        message: "Listing not found" 
      });
    }

    // Update the listing
    const updatedListing = await ListingModel.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true } // Returns the updated document
    );

    res.status(200).send({
      success: true,
      message: "Listing updated successfully",
      listing: updatedListing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in updating listing",
      error: error.message,
    });
  }
};




const deleteListingController = async (req, res) => {
  const listingId = req.params.id;

  try {
    const deletedListing = await ListingModel.findByIdAndDelete(listingId);

    if (!deletedListing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    return res.status(200).json({ success: true, message: 'Listing deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get listings by titleName controller
const getListingByTitle = async (req, res) => {
  try {
    const { titleName } = req.params;
    const listings = await ListingModel.find({ titleName });

    if (listings.length === 0) {
      return res.status(404).send({ error: "Listings not found with the given titleName" });
    }

    res.status(200).json({
      success: true,
      message: "Listings fetched successfully by titleName",
      listings,
    });
  } catch (error) {
    console.error("Error while fetching listings by titleName: ", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching listings by titleName",
      error: error.message,
    });
  }
};

// Get listings created by the logged-in user controller
const getMyListings = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all listings associated with the user
    const listings = await ListingModel.find({ user: userId }).populate('category');

    res.status(200).send({
      success: true,
      message: "Listings created by the user",
      listings,
      totalLengthOfListings: listings.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting user's listings",
      error: error.message,
    });
  }
};

module.exports = {
  createListingController,
  getAllListings,
  getSingleListing,
  getListingByTitle,
  updateListingController,
  deleteListingController,
  getMyListings,
};