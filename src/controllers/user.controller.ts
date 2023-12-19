import { ReqPostUserBodyDto } from '#dtos/ReqPostUserDto';
import { ResUserDto } from '#dtos/ResUserDto';
import { UserService } from '#services/user.service';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

const tag = 'users';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: `사용자 생성`,
    tags: [tag],
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: '사용자 단건',
    type: ResUserDto,
    isArray: false,
  })
  @Post('users')
  async postUser(
    // @Headers() headers: ReqPostUserHeaderDto,
    @Body() body: ReqPostUserBodyDto,
  ): Promise<ResUserDto> {
    const user = await this.userService.create({
      user: {
        name: body.name,
        email: body.email,
        type: body.type,
      },
    });

    return new ResUserDto(user);
  }
}
