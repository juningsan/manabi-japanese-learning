CREATE TABLE `favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`target_type` text NOT NULL,
	`target_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `favorites_target_idx` ON `favorites` (`user_id`,`target_type`,`target_id`);--> statement-breakpoint
CREATE TABLE `grammar` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`meaning` text NOT NULL,
	`structure` text,
	`jlpt_level` text NOT NULL,
	`explanation` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`target_type` text NOT NULL,
	`target_id` integer NOT NULL,
	`result` text NOT NULL,
	`reviewed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`image` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `words` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kanji` text,
	`kana` text NOT NULL,
	`meaning` text NOT NULL,
	`part_of_speech` text,
	`jlpt_level` text,
	`example` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
