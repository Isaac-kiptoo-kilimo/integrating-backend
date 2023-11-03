CREATE OR ALTER PROCEDURE addNote(
    @id VARCHAR(100)  ,
    @title VARCHAR(200) ,
    @content VARCHAR(200),
    @createdAt VARCHAR(100)
)
AS
BEGIN

    INSERT INTO Notes(id, title, content, createdAt)
    VALUES(@id, @title, @content, @createdAt)

END

DROP PROCEDURE addNote