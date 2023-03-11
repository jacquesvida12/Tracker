-- DROP the table
DROP TABLE CALORIES;

--Create table
CREATE TABLE CALORIES (
    cal_id SERIAL PRIMARY KEY,
    cal_name VARCHAR(50) NOT NULL,
    cal_meal VARCHAR(9) NOT NULL,
    cal_protein NUMERIC,
    cal_carbs NUMERIC,
    cal_fats NUMERIC,
    cal_calories NUMERIC NOT NULL, 
    cal_date DATE,
    cal_time TIME,
    cal_notes VARCHAR(60)
);

--inserting records for THU MARCH 9

INSERT INTO CALORIES (cal_name,cal_meal,cal_protein,cal_carbs,cal_fats,cal_calories,cal_date,cal_time,cal_notes)
VALUES
('WafflePB','Breakfast','11','45','17','370','3/9/2023','9:00',''),
('Quesadilla','Lunch','0','0','0','600','3/9/2023','1:30',''),
('Sausage and Potatoe','Dinner','0','0','0','450','3/9/2023','7:15',''),
('WafflePB','Breakfast','11','45','17','370','3/9/2023','9:00','');
