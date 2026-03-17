import Addressmodel from "../models/address.model.js";
import ApiError from "../utils/ApiError.js";

class AddressService {

    async createAddress(userId, data) {
        const existing = await Addressmodel.findOne({ userId });

        const address = await Addressmodel.create({
            ...data,
            userId,
            isDefault: existing ? false : true
        });

        return address;
    }

    async getUserAddresses(userId) {
        return await Addressmodel.find({ userId }).sort({ createdAt: -1 });
    }

    async getUserAddressesByid(Id) {
        return await Addressmodel.findById(Id)
    }

    async deleteAddress(userId, addressId) {

        const address = await Addressmodel.findOneAndDelete({
            _id: addressId,
            userId
        });

        if (!address) {
            throw new ApiError(404, "Address not found");
        }

        return address;
    }

    async setDefaultAddress(userId, addressId) {

        // remove old default
        await Addressmodel.updateMany(
            { userId },
            { isDefault: false }
        );

        const address = await Addressmodel.findOneAndUpdate(
            { _id: addressId, userId },
            { isDefault: true },
            { new: true }
        );

        if (!address) {
            throw new ApiError(404, "Address not found");
        }

        return address;
    }

}

export default new AddressService();