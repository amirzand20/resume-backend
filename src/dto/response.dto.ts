import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    description: 'The status of the response',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: 'The message of the response',
    example: 'Operation completed successfully',
  })
  message: string;

  @ApiProperty({
    description: 'The data returned by the API',
    example: { id: 1, name: 'John Doe' },
    required: false,
  })
  data?: any;
} 