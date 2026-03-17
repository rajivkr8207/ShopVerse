import Sellermodel from "../models/seller.model.js";
import Usermodel from "../models/user.model.js";


class SellerService {
    async registerSeller(data) {
        const {
            fullname,
            email,
            password,
            phone,
            shopName,
            shopAddress,
            shopDescription,
            gstNumber
        } = data;

        const existingUser = await Usermodel.findOne({ email });

        if (existingUser) {
            throw new ApiError(409, "User already exists");
        }

        const user = await Usermodel.create({
            fullname,
            email,
            password,
            phone,
            role: "SELLER"
        });

        // create seller profile
        const seller = await Sellermodel.create({
            userId: user._id,
            shopName,
            shopAddress,
            shopDescription,
            gstNumber
        });

        return { user, seller };
    }
}

export default new SellerService()