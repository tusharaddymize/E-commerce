import Address from "../models/Address.js";


// Get Addresses

export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user._id,
    });

    res.json(addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Add Address

export const addAddress = async (req, res) => {
  try {
    const data = req.body;

    if (data.isDefault) {
      await Address.updateMany(
        {
          user: req.user._id,
        },
        {
          isDefault: false,
        }
      );
    }

    const address = await Address.create({
      ...data,
      user: req.user._id,
    });

    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update

export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address)
      return res.status(404).json({
        message: "Address not found",
      });

    if (address.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        message: "Unauthorized",
      });

    if (req.body.isDefault) {
      await Address.updateMany(
        {
          user: req.user._id,
        },
        {
          isDefault: false,
        }
      );
    }

    Object.assign(address, req.body);

    await address.save();

    res.json(address);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address)
      return res.status(404).json({
        message: "Address not found",
      });

    await address.deleteOne();

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Default Address

export const setDefaultAddress = async (req, res) => {
  try {
    await Address.updateMany(
      {
        user: req.user._id,
      },
      {
        isDefault: false,
      }
    );

    const address = await Address.findById(req.params.id);

    address.isDefault = true;

    await address.save();

    res.json(address);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};