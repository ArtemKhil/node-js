const fs = require('fs/promises');
const path = require('path');


const sortGenders = async (readFolder, writeFolder, gender) => {
    try {
        const pathFolder = path.join(__dirname, readFolder);

        const files = await fs.readdir(pathFolder);

        for (const file of files) {
            const filePath = path.join(pathFolder, file);
            const data = await fs.readFile(filePath);
            const user = JSON.parse(data);

            if (user.gender === gender) {
                await fs.rename(filePath, path.join(__dirname, writeFolder, file));
            }
        }
    } catch (e) {
        console.error(e);
    }
};

sortGenders('boys', 'girls', 'female');
sortGenders('girls', 'boys', 'male');


// const sortFemaleGenders = async () => {
//
//     const folderPath = path.join(__dirname, 'boys');
//
//     const files = await fs.readdir(folderPath);
//
//     for (const file of files) {
//         const filePath = path.join(folderPath, file);
//         const data = await fs.readFile(filePath);
//         const user = JSON.parse(data);
//
//         if (user.gender === 'female') {
//             await fs.rename(filePath, path.join(__dirname, 'girls', file));
//         }
//     }
// };
//
// const sortMaleGenders = async () => {
//
//     const folderPath = path.join(__dirname, 'girls');
//     const files = await fs.readdir(folderPath);
//
//     for (const file of files) {
//         const filePath = path.join(folderPath, file);
//         const data = await fs.readFile(filePath);
//         const user = JSON.parse(data);
//
//         if (user.gender === 'male') {
//             await fs.rename(filePath, path.join(__dirname, 'boys', file));
//         }
//     }
// };
//
//
// sortFemaleGenders();
// sortMaleGenders();