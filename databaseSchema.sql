CREATE TABLE todolist (
	id SERIAL PRIMARY KEY NOT NULL,
	todotext VARCHAR(200),
	active BOOLEAN);

INSERT INTO todolist(todotext, active) VALUES ('Do laundry', true);
INSERT INTO todolist(todotext, active) VALUES ('Finish homework', true);
INSERT INTO todolist(todotext, active) VALUES ('Call mom', true);
INSERT INTO todolist(todotext, active) VALUES ('Fix truck', false);
INSERT INTO todolist(todotext, active) VALUES ('Decorate cake', false);
