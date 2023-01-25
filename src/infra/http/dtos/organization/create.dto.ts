import { IsString, IsUrl } from 'class-validator';

export class CreateOrganizationDTO {
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsUrl(
        {},
        {
            message: 'Logo must be a valid URL',
        },
    )
    logo: string;
}
