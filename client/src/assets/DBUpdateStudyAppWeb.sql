BEGIN TRANSACTION

BEGIN TRY

EXEC sp_rename '[dbo].[User]', '[dbo].[Nutzer]';
EXEC sp_rename '[dbo].[Fragenkatalog]', '[dbo].[Frage]';
EXEC sp_rename '[dbo].[KatalogID]', '[dbo].[Katalog]';
EXEC sp_rename '[dbo].[Score]', '[dbo].[Versuch]';
EXEC sp_rename '[dbo].[Nutzer].[UserID]', 'NutzerID', 'COLUMN';
EXEC sp_rename '[dbo].[Versuch].ScoreID', 'VersuchID', 'COLUMN';
EXEC sp_rename '[dbo].[Versuch].Score', 'Punktestand', 'COLUMN';

DROP TABLE [dbo].[Person];

CREATE TABLE Auswertung (
	AuswertungÍD int primary Key,
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
