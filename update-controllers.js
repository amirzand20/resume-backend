const fs = require('fs');
const path = require('path');

// Controllers to update
const controllersToUpdate = [
  'src/modules/common/controllers/experience.controller.ts',
  'src/modules/common/controllers/skill.controller.ts',
  'src/modules/common/controllers/certificate.controller.ts',
  'src/modules/common/controllers/language-info.controller.ts',
  'src/modules/common/controllers/contact-info.controller.ts',
  'src/modules/common/controllers/additional-information.controller.ts',
  'src/modules/common/controllers/document.controller.ts',
];

// Import statements to add
const importsToAdd = [
  'UseGuards',
  'ApiBearerAuth',
  'JwtAuthGuard'
];

// Function to update a controller file
function updateController(filePath) {
  try {
    console.log(`Updating ${filePath}...`);
    
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add UseGuards to imports if not present
    if (!content.includes('UseGuards')) {
      content = content.replace(
        /import {([^}]*)}/,
        (match, imports) => `import {${imports}, UseGuards}`
      );
    }
    
    // Add ApiBearerAuth to imports if not present
    if (!content.includes('ApiBearerAuth')) {
      content = content.replace(
        /import {([^}]*)} from '@nestjs\/swagger'/,
        (match, imports) => `import {${imports}, ApiBearerAuth} from '@nestjs/swagger'`
      );
    }
    
    // Add JwtAuthGuard import if not present
    if (!content.includes('JwtAuthGuard')) {
      const lastImport = content.lastIndexOf('import');
      const endOfLastImport = content.indexOf(';', lastImport) + 1;
      const importStatement = "\nimport { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';";
      
      content = content.slice(0, endOfLastImport) + importStatement + content.slice(endOfLastImport);
    }
    
    // Add UseGuards and ApiBearerAuth decorators if not present
    if (!content.includes('@UseGuards(JwtAuthGuard)')) {
      content = content.replace(
        /@Controller\(['"](.*)['"]\)/,
        (match) => `${match}\n@UseGuards(JwtAuthGuard)\n@ApiBearerAuth('JWT-auth')`
      );
    }
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
  }
}

// Update all controllers
controllersToUpdate.forEach(updateController);
console.log('All controllers updated successfully!'); 