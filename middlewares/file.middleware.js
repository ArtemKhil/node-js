const MyError = require("../errors/myError");
const {IMAGE_MAX_SIZE, IMAGE_MIMETYPES} = require("../configs/fileUpload.config");

module.exports = {
    checkUploadImage: async (req, res, next) => {
        try {
            if (!req.files) {
                throw new MyError('No files to upload', 400);
            }

            const imagesToUpload = Object.values(req.files);
            for (const image of imagesToUpload) {

                const {size, mimetype, name} = image;

                if (size > IMAGE_MAX_SIZE) {
                    throw new MyError(`File ${name} is too big`, 400);
                }
                if (!IMAGE_MIMETYPES.includes(mimetype)) {
                    throw new MyError(`File ${name} has invalid format`, 400);
                }
            }
            next();
        } catch (e) {
            next(e);
        }
    },

};