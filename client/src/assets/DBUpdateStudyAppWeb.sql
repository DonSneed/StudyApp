BEGIN TRANSACTION

BEGIN TRY

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 39ef692f5101946b765a5132d8ed98683c29cecd
EXEC sp_rename '[dbo].[User]', 'Nutzer';
EXEC sp_rename '[dbo].[Fragenkatalog]', 'Frage';
EXEC sp_rename '[dbo].[KatalogID]', 'Katalog';
EXEC sp_rename '[dbo].[Score]', 'Versuch';
<<<<<<< HEAD




DROP TABLE [dbo].[Person];

CREATE TABLE Auswertung (
	Auswertung�D int primary Key,
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
