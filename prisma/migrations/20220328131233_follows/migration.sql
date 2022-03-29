-- CreateTable
CREATE TABLE "_FollowRrelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowRrelation_AB_unique" ON "_FollowRrelation"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowRrelation_B_index" ON "_FollowRrelation"("B");

-- AddForeignKey
ALTER TABLE "_FollowRrelation" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowRrelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
