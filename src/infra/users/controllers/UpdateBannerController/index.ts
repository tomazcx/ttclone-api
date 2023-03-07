import {Controller, Request, HttpCode, HttpStatus, Patch, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from 'path'
import {AbstractUpdateBanner} from "src/domain/users/services/abstract-update-banner.service";

@Controller('users')
export class UpdateBannerController {

	constructor(
		private readonly updateBannerService: AbstractUpdateBanner
	) {}

	@Patch('/banner')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('banner', {
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
		return await this.updateBannerService.execute(image.filename, req.user)
	}

}
