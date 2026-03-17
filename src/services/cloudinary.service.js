import ImageKit, { toFile } from "@imagekit/nodejs";
import config from '../config/config.js'


const client = new ImageKit({
    privateKey: config.IMAGE_KIT,
});


export async function uploadImage(file) {
    const Image = await client.files.upload({
        file: await toFile(Buffer.from(file), 'file'),
        fileName: `produt_${Date.now()}`,
        folder: "/ecommerce/product"
    });

    return Image
}
