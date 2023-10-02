-- CreateTable
CREATE TABLE "OrganizationRole" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrganizationToPermission" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationRoleToPermission" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationRoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToPermission_AB_unique" ON "_OrganizationToPermission"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToPermission_B_index" ON "_OrganizationToPermission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationRoleToPermission_AB_unique" ON "_OrganizationRoleToPermission"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationRoleToPermission_B_index" ON "_OrganizationRoleToPermission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationRoleToUser_AB_unique" ON "_OrganizationRoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationRoleToUser_B_index" ON "_OrganizationRoleToUser"("B");

-- AddForeignKey
ALTER TABLE "OrganizationRole" ADD CONSTRAINT "OrganizationRole_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToPermission" ADD CONSTRAINT "_OrganizationToPermission_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToPermission" ADD CONSTRAINT "_OrganizationToPermission_B_fkey" FOREIGN KEY ("B") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationRoleToPermission" ADD CONSTRAINT "_OrganizationRoleToPermission_A_fkey" FOREIGN KEY ("A") REFERENCES "OrganizationRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationRoleToPermission" ADD CONSTRAINT "_OrganizationRoleToPermission_B_fkey" FOREIGN KEY ("B") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationRoleToUser" ADD CONSTRAINT "_OrganizationRoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "OrganizationRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationRoleToUser" ADD CONSTRAINT "_OrganizationRoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
