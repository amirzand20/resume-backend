import { Controller, Post, Body, UseGuards, Get, Request, Query, Headers, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiOAuth2, ApiQuery, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../application/auth.service';
import { LoginDto } from '../domain/dto/login.dto';
import { RegisterDto } from '../domain/dto/register.dto';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../../shared/guards/local-auth.guard';
import { Public } from '../../../shared/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with username and password - OAuth2 compatible' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req, @Body() loginDto: LoginDto, @Query() query, @Headers() headers) {
    // Extract OAuth2 parameters if present
    const grantType = loginDto.grant_type || query.grant_type;
    const clientId = loginDto.client_id || query.client_id;
    const clientSecret = loginDto.client_secret || query.client_secret;
    const scope = loginDto.scope || query.scope;
    
    // Log parameters for debugging
    console.log('OAuth2 Parameters:', { grantType, clientId, clientSecret, scope });
    
    // Handle different grant types
    if (grantType === 'client_credentials') {
      return this.authService.generateClientCredentialsToken(clientId);
    }
    const user = await this.authService.validateUser(loginDto.username , loginDto.password)

     
    // Default to password flow
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get the profile of the logged in user' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }
} 