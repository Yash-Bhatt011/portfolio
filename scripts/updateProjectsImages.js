const fs = require('fs');
const path = require('path');

const projectsJsonPath = path.join(__dirname, '..', 'public', 'res_primaryLanguage.json');
const imagesBasePath = path.join(__dirname, '..', 'public', 'images', 'portfolio');

function getImagesForProject(projectFolder) {
  const folderPath = path.join(imagesBasePath, projectFolder);
  if (!fs.existsSync(folderPath)) {
    console.warn(`Folder not found: ${folderPath}`);
    return [];
  }
  const files = fs.readdirSync(folderPath);
  // Filter image files (jpg, jpeg, png, gif)
  const images = files.filter(file => /\.(jpe?g|png|gif)$/i.test(file))
    .map(file => `images/portfolio/${projectFolder}/${file}`);
  return images;
}

function updateProjectsImages() {
  if (!fs.existsSync(projectsJsonPath)) {
    console.error(`Projects JSON file not found: ${projectsJsonPath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf-8'));
  if (!data.projects || !Array.isArray(data.projects)) {
    console.error('Invalid projects data in JSON');
    process.exit(1);
  }

  data.projects = data.projects.map(project => {
    // Extract project folder from first image path if exists
    let projectFolder = null;
    if (project.images && project.images.length > 0) {
      const firstImagePath = project.images[0];
      const match = firstImagePath.match(/images\/portfolio\/([^\/]+)\//);
      if (match) {
        projectFolder = match[1];
      }
    }
    if (projectFolder) {
      const images = getImagesForProject(projectFolder);
      return { ...project, images };
    } else {
      console.warn(`Could not determine project folder for project: ${project.title}`);
      return project;
    }
  });

  fs.writeFileSync(projectsJsonPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Projects images updated successfully.');
}

updateProjectsImages();
