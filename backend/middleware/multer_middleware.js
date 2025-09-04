import multer from "multer"; //main library to handle file uploads
import path from "path"; //makes safe paths across operating systems
import fs from "fs"; //used to check/create folders for storage

const uploadDir = path.join(process.cwd(), "public", "temp");


fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

export const upload = multer({ storage });






/*Multer is a middleware for Express.js that handles multipart/form-data — the type of request used for file uploads.

When a user uploads a file from the frontend (say an image), the request body is not plain JSON — it’s binary (file + form data).

Multer extracts that file from the request and allows you to store it locally (on disk) or in memory.

process.cwd() = Current Working Directory (where you run node index.js)
"public/temp" = your chosen folder for temporary storage
path.join(...) = ensures the correct path (/ vs \) regardless of Windows/Linux

fs.mkdirSync(uploadDir, { recursive: true });

1. If public/temp doesn’t exist → creates it
2. { recursive: true } means it will also create missing parent folders

*/
