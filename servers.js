

const fs = require('fs');
const path = require('path');

// Function to create a directory and the corresponding file inside it
function createFileWithContent(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

const rootFolder = path.join(__dirname, 'client');

// Create index.html and style.css for the root folder
createFileWithContent(
  path.join(rootFolder, 'index.html'),
  '<!DOCTYPE html><html><head><title>Home</title><link rel="stylesheet" href="style.css"></head><body><h1>Home</h1></body></html>'
);
createFileWithContent(path.join(rootFolder, 'style.css'), 'body { background-color: #F0F0F0; }');

// Create subfolders and their respective files
const subfolders = [
  { name: 'contact', color: '#FFC0CB' },
  { name: 'about', color: '#00FFFF' },
  { name: 'blog', color: '#90EE90' },
];

subfolders.forEach((folder) => {
  const folderPath = path.join(rootFolder, folder.name);
  const indexPath = path.join(folderPath, 'index.html');
  const stylePath = path.join(folderPath, 'style.css');
  const pageTitle = folder.name.charAt(0).toUpperCase() + folder.name.slice(1);

  fs.mkdirSync(folderPath, { recursive: true });
  createFileWithContent(
    indexPath,
    `<!DOCTYPE html><html><head><title>${pageTitle}</title><link rel="stylesheet" href="style.css"></head><body><h1>${pageTitle}</h1></body></html>`
  );
  createFileWithContent(stylePath, `body { background-color: ${folder.color}; }`);
});

// Determine the OS and add corresponding info to info.txt
const osName = process.platform === 'linux' ? 'Ubuntu' : 'Unknown OS';
const infoFilePath = path.join(rootFolder, 'info.txt');
const infoText = `This is being run on a ${osName} computer!`;
createFileWithContent(infoFilePath, infoText);

console.log('Web structure created successfully!');
