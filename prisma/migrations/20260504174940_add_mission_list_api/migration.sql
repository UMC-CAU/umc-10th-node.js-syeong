-- AddForeignKey
ALTER TABLE `user_missions_ch5` ADD CONSTRAINT `user_missions_ch5_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `missions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
