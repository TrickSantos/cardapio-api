import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { SupabaseModule } from '@infra/uploads/supabase/supabase.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [HttpModule, DatabaseModule, SupabaseModule],
})
export class AppModule {}
