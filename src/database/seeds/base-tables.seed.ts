import { DataSource } from 'typeorm';
import { BaseTable } from '../../entity/base-table.entity';

export async function seedBaseTables(dataSource: DataSource): Promise<void> {
  const baseTableRepository = dataSource.getRepository(BaseTable);

  const baseTables = [
    {
      tableName: 'Education Grades',
      parentId: undefined,
    },
    {
      tableName: 'Education Levels',
      parentId: undefined,
    },
    {
      tableName: 'Education Fields',
      parentId: undefined,
    },
    {
      tableName: 'Institutes',
      parentId: undefined,
    },
    {
      tableName: 'Skills',
      parentId: undefined,
    },
    {
      tableName: 'Skill Levels',
      parentId: undefined,
    },
    {
      tableName: 'Certificate Types',
      parentId: undefined,
    },
    {
      tableName: 'Languages',
      parentId: undefined,
    },
    {
      tableName: 'Language Levels',
      parentId: undefined,
    },
    {
      tableName: 'Job Types',
      parentId: undefined,
    },
    {
      tableName: 'Organizations',
      parentId: undefined,
    },
    {
      tableName: 'Income Levels',
      parentId: undefined,
    },
    {
      tableName: 'Document Types',
      parentId: undefined,
    },
    {
      tableName: 'Sex Types',
      parentId: undefined,
    },
    {
      tableName: 'Places',
      parentId: undefined,
    },
  ];

  for (const table of baseTables) {
    const existingTable = await baseTableRepository.findOne({
      where: { tableName: table.tableName },
    });

    if (!existingTable) {
      await baseTableRepository.save(table);
    }
  }
} 