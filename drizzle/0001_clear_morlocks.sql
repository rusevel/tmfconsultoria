CREATE TABLE `lead_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`company` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`companySize` varchar(80) NOT NULL,
	`challenge` varchar(120) NOT NULL,
	`source` varchar(80) NOT NULL DEFAULT 'diagnostico-home',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lead_submissions_id` PRIMARY KEY(`id`)
);
