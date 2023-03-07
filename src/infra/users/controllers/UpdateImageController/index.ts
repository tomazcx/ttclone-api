import {Controller, Request, HttpCode, HttpStatus, Patch, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from 'path'
import {AbstractUpdateImage} from "src/domain/users/services/abstract-update-image.service";

@Controller('users')
export class UpdateImageController {

	constructor(
		private readonly updateImageService: AbstractUpdateImage
	) {}

	@Patch('/image')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('image', {
		storage: diskStorage({
			destination: 'temp/uploads',
			filename: (req, file, callback) => {
				const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 1e9)
				const ext = path.extname(file.originalname)
				const filename = `${uniqueSufix}${ext}`
				callback(null, filename)
			}
		})
	}))
	async handle(@UploadedFile() image: Express.Multer.File, @Request() req: any) {
		return await this.updateImageService.execute(image.filename, req.user)
	}

}
