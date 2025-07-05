# User Authentication System

This document describes the user authentication system implemented for the resume backend application.

## Features

- **User Registration**: Create new user accounts with username, email, and password
- **User Login**: Authenticate users with username/email and password
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Automatic password hashing using bcrypt
- **Protected Routes**: JWT guard for protecting API endpoints
- **User Profile**: Get current user profile information

## API Endpoints

### 1. User Registration
```
POST /auth/register
```

**Request Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. User Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Get User Profile (Protected)
```
GET /auth/profile
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "role": "user"
}
```

## Database Schema

### Users Table (`tb_users`)
```sql
CREATE TABLE tb_users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Implementation Details

### 1. User Entity (`src/entities/user.entity.ts`)
- Uses TypeORM decorators for database mapping
- Automatic password hashing with bcrypt on insert
- Follows project naming conventions (`tb_users` table)

### 2. User Repository (`src/auth/user.repository.ts`)
- Extends TypeORM Repository
- Custom methods for finding users by username, email, or both
- User creation with proper error handling

### 3. User Service (`src/auth/user.service.ts`)
- Business logic for user operations
- Password validation using bcrypt
- Duplicate username/email checking
- User status validation

### 4. Auth Service (`src/auth/auth.service.ts`)
- JWT token generation
- User validation for login
- Registration with proper response formatting

### 5. JWT Strategy (`src/auth/strategies/jwt.strategy.ts`)
- Token validation and user lookup
- User status verification
- Proper error handling for invalid tokens

### 6. JWT Guard (`src/auth/guards/jwt-guard.guard.ts`)
- Route protection middleware
- Automatic user injection into request object

## Security Features

1. **Password Hashing**: All passwords are automatically hashed using bcrypt with salt rounds of 10
2. **JWT Tokens**: Secure token-based authentication with configurable expiration
3. **Input Validation**: DTO validation using class-validator
4. **Error Handling**: Proper HTTP status codes and error messages
5. **User Status**: Active/inactive user status checking

## Environment Variables

Make sure these environment variables are set:
```env
JWT_SECRET=your-secret-key-here
DB_URL=localhost
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_DATABASE=your-database-name
```

## Usage Examples

### Protecting Routes
```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-guard.guard';

@Controller('protected')
export class ProtectedController {
  @Get('data')
  @UseGuards(JwtAuthGuard)
  async getProtectedData() {
    return { message: 'This is protected data' };
  }
}
```

### Accessing User in Controllers
```typescript
import { Request } from '@nestjs/common';

@Get('profile')
@UseGuards(JwtAuthGuard)
async getProfile(@Request() req) {
  return req.user; // Contains user data from JWT
}
```

## Testing

Use the provided `test-auth.http` file to test the authentication endpoints:

1. **Register a new user**
2. **Login with username**
3. **Login with email**
4. **Access protected profile endpoint**

## Error Handling

The system handles various error scenarios:
- **409 Conflict**: Username or email already exists
- **401 Unauthorized**: Invalid credentials or inactive user
- **404 Not Found**: User not found
- **400 Bad Request**: Invalid input data

## Future Enhancements

1. **Password Reset**: Email-based password reset functionality
2. **Email Verification**: Email verification for new registrations
3. **Role-based Access Control**: More granular permissions
4. **Refresh Tokens**: Token refresh mechanism
5. **Rate Limiting**: API rate limiting for security
6. **Audit Logging**: User action logging 