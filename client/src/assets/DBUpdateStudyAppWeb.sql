BEGIN TRANSACTION

BEGIN TRY

EXEC sp_rename '[dbo].[User]', 'Nutzer';
EXEC sp_rename '[dbo].[Fragenkatalog]', 'Frage';
EXEC sp_rename '[dbo].[KatalogID]', 'Katalog';
EXEC sp_rename '[dbo].[Score]', 'Versuch';




DROP TABLE [dbo].[Person];

CREATE TABLE Auswertung (
	AuswertungID int primary Key,
	VersuchID int FOREIGN KEY REFERENCES [dbo].[Versuch](VersuchID),
	FrageID int FOREIGN KEY REFERENCES [dbo].[Frage](FrageID),
	Richtig bit
);

ALTER TABLE [dbo].[Nutzer]
ADD EMail varchar(30),
	Erstelldatum date,
	Folge int,
	LetzterLogin date;

ALTER TABLE [dbo].[Nutzer]
ALTER COLUMN [Password] varchar(30);


ALTER TABLE [dbo].[Katalog]
ALTER COLUMN Katalog varchar(30);

ALTER TABLE [dbo].[Katalog]
ADD Ersteller int FOREIGN KEY REFERENCES [dbo].[Nutzer](NutzerID),
	Erstelldatum date,
	Oeffentlich bit,
	Original int;

ALTER TABLE [dbo].[Frage]
ALTER COLUMN Ergebniss char(6);

ALTER TABLE [dbo].[Frage]
ADD Antwort6 varchar(100);

ALTER TABLE [dbo].[Versuch]
DROP COLUMN VersuchNR;

END TRY
BEGIN CATCH
	IF @@TRANCOUNT>0
		ROLLBACK TRANSACTION;

THROW;

END CATCH;

IF @@TRANCOUNT>0
	COMMIT TRANSACTION;
GO
