import addressServices from "../services/address.services.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createAddress = asyncHandler(async (req, res) => {

    const address = await addressServices.createAddress(
        req.user.id,
        req.body
    );

    return res.status(201).json(
        new ApiResponse(201, address, "Address added successfully")
    );
});

export const getAddresses = asyncHandler(async (req, res) => {

    const addresses = await addressServices.getUserAddresses(req.user.id);

    return res.status(200).json(
        new ApiResponse(200, addresses, "Addresses fetched")
    );
});
export const getAddressesByid = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const addresses = await addressServices.getUserAddressesByid(id);

    return res.status(200).json(
        new ApiResponse(200, addresses, "Addresses fetched")
    );
});
export const deleteAddress = asyncHandler(async (req, res) => {

    const { id } = req.params;

    await addressServices.deleteAddress(req.user.id, id);

    return res.status(200).json(
        new ApiResponse(200, null, "Address deleted")
    );
});

export const setDefaultAddress = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const address = await addressServices.setDefaultAddress(req.user.id, id);

    return res.status(200).json(
        new ApiResponse(200, address, "Default address updated")
    );
});