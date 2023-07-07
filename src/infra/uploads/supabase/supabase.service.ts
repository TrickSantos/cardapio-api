import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';
import { writeFileSync, unlinkSync, readFileSync } from 'node:fs';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            process.env.SUPABASE_URL ?? '',
            process.env.SUPABASE_KEY ?? '',
        );
    }

    async uploadFile(file) {
        const fileName = randomUUID();
        const ext = this.getFileExtension(file[0].mimetype);
        const buffer = Buffer.from(file[0].data);
        const filePath = `./${fileName + ext}`;

        writeFileSync(filePath, buffer);

        const arquivo = readFileSync(filePath);

        const { error } = await this.supabase.storage
            .from(process.env.SUPABASE_BUCKET ?? '')
            .upload(fileName + ext, arquivo);

        unlinkSync(filePath);

        const publicUrl = this.supabase.storage
            .from(process.env.SUPABASE_BUCKET ?? '')
            .getPublicUrl(fileName + ext).data.publicUrl;

        if (error) {
            throw new Error(error.message);
        }
        return publicUrl;
    }

    private getFileExtension(fileType: string): string | null {
        const extensionMap: { [key: string]: string } = {
            'image/jpeg': '.jpg',
            'image/png': '.png',
            'image/gif': '.gif',
            'image/bmp': '.bmp',
            'image/webp': '.webp',
            'image/tiff': '.tiff',
            'image/svg+xml': '.svg',
            'image/x-icon': '.ico',
        };

        return extensionMap[fileType] || null;
    }
}
