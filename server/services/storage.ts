import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, '../../client/public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const uploadFile = async (fileName: string, content: string, mimeType: string): Promise<string> => {
    const filePath = path.join(UPLOAD_DIR, fileName);
    await fs.promises.writeFile(filePath, content, 'utf-8');

    // Return URL relative to public (will be served by Vite/Express)
    return `/uploads/${fileName}`;
};
