const fs = require('fs/promises');
const path = require('path');

module.exports = {
    reader: async () => {
        const buffer = await fs.readFile(path.join(process.cwd(), 'dataBase', 'users.json'))
        return JSON.parse(buffer.toString());
    },

    writer: async (users) => {
        await fs.writeFile(path.join(process.cwd(), 'dataBase', 'users.json'), JSON.stringify(users));
    }
};