export class CreatePostDto {
    readonly userId : string;
    readonly username : string;
    readonly urlImg : string;
    readonly community : string;
    readonly title: string;
    readonly text : string;
}