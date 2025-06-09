import { DataSource } from 'typeorm';
import { BaseItem } from '../../entity/base-item.entity';
import { BaseTable } from '../../entity/base-table.entity';

export async function seedBaseItems(dataSource: DataSource): Promise<void> {
  const baseItemRepository = dataSource.getRepository(BaseItem);
  const baseTableRepository = dataSource.getRepository(BaseTable);

  const baseItems = [
    // Education Grades
    {
      tableName: 'Education Grades',
      items: [
        { itemName: 'Bachelor', itemCode: 'BSC' },
        { itemName: 'Master', itemCode: 'MSC' },
        { itemName: 'PhD', itemCode: 'PHD' },
        { itemName: 'Associate Degree', itemCode: 'AD' },
        { itemName: 'High School Diploma', itemCode: 'HSD' },
      ],
    },
    // Education Levels
    {
      tableName: 'Education Levels',
      items: [
        { itemName: 'Excellent', itemCode: 'EXC' },
        { itemName: 'Very Good', itemCode: 'VGD' },
        { itemName: 'Good', itemCode: 'GOOD' },
        { itemName: 'Fair', itemCode: 'FAIR' },
      ],
    },
    // Education Fields
    {
      tableName: 'Education Fields',
      items: [
        { itemName: 'Computer Science', itemCode: 'CS' },
        { itemName: 'Information Technology', itemCode: 'IT' },
        { itemName: 'Software Engineering', itemCode: 'SE' },
        { itemName: 'Electrical Engineering', itemCode: 'EE' },
        { itemName: 'Mechanical Engineering', itemCode: 'ME' },
      ],
    },
    // Institutes
    {
      tableName: 'Institutes',
      items: [
        { itemName: 'University of Tehran', itemCode: 'UT' },
        { itemName: 'Sharif University', itemCode: 'SU' },
        { itemName: 'Amirkabir University', itemCode: 'AU' },
        { itemName: 'Iran University of Science and Technology', itemCode: 'IUST' },
      ],
    },
    // Skills
    {
      tableName: 'Skills',
      items: [
        { itemName: 'JavaScript', itemCode: 'JS' },
        { itemName: 'TypeScript', itemCode: 'TS' },
        { itemName: 'Python', itemCode: 'PY' },
        { itemName: 'Java', itemCode: 'JV' },
        { itemName: 'C#', itemCode: 'CS' },
        { itemName: 'React', itemCode: 'RCT' },
        { itemName: 'Angular', itemCode: 'ANG' },
        { itemName: 'Vue.js', itemCode: 'VUE' },
        { itemName: 'Node.js', itemCode: 'NJS' },
        { itemName: 'SQL', itemCode: 'SQL' },
      ],
    },
    // Skill Levels
    {
      tableName: 'Skill Levels',
      items: [
        { itemName: 'Beginner', itemCode: 'BEG' },
        { itemName: 'Intermediate', itemCode: 'INT' },
        { itemName: 'Advanced', itemCode: 'ADV' },
        { itemName: 'Expert', itemCode: 'EXP' },
      ],
    },
    // Certificate Types
    {
      tableName: 'Certificate Types',
      items: [
        { itemName: 'Professional Certification', itemCode: 'PRO' },
        { itemName: 'Academic Certificate', itemCode: 'ACA' },
        { itemName: 'Training Certificate', itemCode: 'TRN' },
        { itemName: 'Language Certificate', itemCode: 'LNG' },
      ],
    },
    // Languages
    {
      tableName: 'Languages',
      items: [
        { itemName: 'English', itemCode: 'EN' },
        { itemName: 'Persian', itemCode: 'FA' },
        { itemName: 'Arabic', itemCode: 'AR' },
        { itemName: 'French', itemCode: 'FR' },
        { itemName: 'German', itemCode: 'DE' },
      ],
    },
    // Language Levels
    {
      tableName: 'Language Levels',
      items: [
        { itemName: 'Basic', itemCode: 'BAS' },
        { itemName: 'Intermediate', itemCode: 'INT' },
        { itemName: 'Advanced', itemCode: 'ADV' },
        { itemName: 'Fluent', itemCode: 'FLU' },
        { itemName: 'Native', itemCode: 'NAT' },
      ],
    },
    // Job Types
    {
      tableName: 'Job Types',
      items: [
        { itemName: 'Software Developer', itemCode: 'SD' },
        { itemName: 'Project Manager', itemCode: 'PM' },
        { itemName: 'Business Analyst', itemCode: 'BA' },
        { itemName: 'Data Scientist', itemCode: 'DS' },
        { itemName: 'DevOps Engineer', itemCode: 'DO' },
      ],
    },
    // Organizations
    {
      tableName: 'Organizations',
      items: [
        { itemName: 'Private Company', itemCode: 'PRV' },
        { itemName: 'Government', itemCode: 'GOV' },
        { itemName: 'Non-Profit', itemCode: 'NPO' },
        { itemName: 'Educational', itemCode: 'EDU' },
      ],
    },
    // Income Levels
    {
      tableName: 'Income Levels',
      items: [
        { itemName: 'Low', itemCode: 'LOW' },
        { itemName: 'Medium', itemCode: 'MED' },
        { itemName: 'High', itemCode: 'HIG' },
        { itemName: 'Very High', itemCode: 'VHI' },
      ],
    },
    // Document Types
    {
      tableName: 'Document Types',
      items: [
        { itemName: 'National ID', itemCode: 'NID' },
        { itemName: 'Passport', itemCode: 'PAS' },
        { itemName: 'Birth Certificate', itemCode: 'BCT' },
        { itemName: 'Resume', itemCode: 'RES' },
        { itemName: 'Certificate', itemCode: 'CERT' },
      ],
    },
    // Sex Types
    {
      tableName: 'Sex Types',
      items: [
        { itemName: 'Male', itemCode: 'M' },
        { itemName: 'Female', itemCode: 'F' },
      ],
    },
    // Places (Cities)
    {
      tableName: 'Places',
      items: [
        { itemName: 'Tehran', itemCode: 'THR' },
        { itemName: 'Mashhad', itemCode: 'MHD' },
        { itemName: 'Isfahan', itemCode: 'ISF' },
        { itemName: 'Shiraz', itemCode: 'SHR' },
        { itemName: 'Tabriz', itemCode: 'TBR' },
      ],
    },
  ];

  for (const category of baseItems) {
    const table = await baseTableRepository.findOne({
      where: { tableName: category.tableName },
    });

    if (table) {
      for (const item of category.items) {
        const existingItem = await baseItemRepository.findOne({
          where: {
            tableId: table.id,
            itemName: item.itemName,
          },
        });

        if (!existingItem) {
          await baseItemRepository.save({
            tableId: table.id,
            itemName: item.itemName,
            itemCode: item.itemCode,
            isActive: true,
          });
        }
      }
    }
  }
} 