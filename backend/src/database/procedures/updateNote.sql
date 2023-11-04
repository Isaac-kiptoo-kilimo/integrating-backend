CREATE OR ALTER PROCEDURE UpdateNote (
    @id VARCHAR(100),
    @title VARCHAR(200),
    @content VARCHAR(200),
    @createdAt VARCHAR(100)
)
AS
BEGIN
    UPDATE Notes SET title = @title, content = @content ,createdAt=@createdAt WHERE id = @id;
END;


DROP PROCEDURE IF EXISTS UpdateNote;


