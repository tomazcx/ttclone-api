import {PartialType} from "@nestjs/mapped-types";
import {CreateTweetDto} from "./create-tweet.dto";

export class RetweetDto extends PartialType(CreateTweetDto) {}
