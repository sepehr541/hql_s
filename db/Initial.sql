INSERT INTO room VALUES (101, 1, 'Single');
INSERT INTO room VALUES (102, 1, 'Single');
INSERT INTO room VALUES (103, 2, 'Double');
INSERT INTO room VALUES (104, 2, 'Queen');
INSERT INTO room VALUES (105, 3, 'King');
INSERT INTO room VALUES (201, 1, 'Single');
INSERT INTO room VALUES (202, 1, 'Single');
INSERT INTO room VALUES (203, 2, 'Double');
INSERT INTO room VALUES (204, 2, 'Queen');
INSERT INTO room VALUES (205, 3, 'King');
INSERT INTO room VALUES (301, 1, 'Single');
INSERT INTO room VALUES (302, 1, 'Single');
INSERT INTO room VALUES (303, 2, 'Double');
INSERT INTO room VALUES (304, 2, 'Queen');
INSERT INTO room VALUES (305, 3, 'King');
INSERT INTO room VALUES (401, 1, 'Single');
INSERT INTO room VALUES (402, 1, 'Single');
INSERT INTO room VALUES (403, 2, 'Double');
INSERT INTO room VALUES (404, 2, 'Queen');
INSERT INTO room VALUES (405, 3, 'King');
INSERT INTO room VALUES (501, 3, 'King');
INSERT INTO room VALUES (502, 4, 'King');
INSERT INTO room VALUES (503, 4, 'King');
INSERT INTO room VALUES (504, 5, 'King');
INSERT INTO room VALUES (505, 5, 'King');

INSERT INTO Employees values(11250, 'Asghar Tavasoli', 'Financial Analyst', 100000, 'asghar69');
INSERT INTO Employees values (19480,'Molok Hooshangi',  'HouseKeeper', 45000, 'Moloki85');
INSERT INTO Employees values (10261, 'Amir Sayyar', 'IT', 250000, 'amir2211' );
INSERT INTO Employees values (16443 , 'Sepehr Noorafshan', 'Manger', 250000, 'sepeher541' );
INSERT INTO Employees values (18421 , 'Jake xi', 'Chief', 100000, 'xixi' );
INSERT INTO Employees values (11233, 'John Norton', 'Front Desk', 60000, 'johnny22' );

INSERT INTO customerservice VALUES (1, 'Management', '09:00', '17:00');
INSERT INTO customerservice VALUES (2, 'HouseKeeping', '00:00', '12:00');
INSERT INTO customerservice VALUES (3, 'Reception', '00:00', '12:00');
INSERT INTO customerservice VALUES (4, 'RoomService', '00:00', '12:00');

INSERT INTO Employeeworksin VALUES (11250 ,1);
INSERT INTO Employeeworksin VALUES (19480, 2);
INSERT INTO Employeeworksin VALUES (10261, 1);
INSERT INTO Employeeworksin VALUES (18421, 4);
INSERT INTO Employeeworksin VALUES (11233, 3);
INSERT INTO Employeeworksin VALUES (16443, 1);

INSERT INTO roomprice VALUES ('Single', 400);
INSERT INTO roomprice VALUES ('Double', 500);
INSERT INTO roomprice VALUES ('Queen', 550);
INSERT INTO roomprice VALUES ('King', 650);

INSERT INTO parking VALUES (1);
INSERT INTO parking VALUES (2);
INSERT INTO parking VALUES (3);
INSERT INTO parking VALUES (4);
INSERT INTO parking VALUES (5);
INSERT INTO parking VALUES (6);
INSERT INTO parking VALUES (7);
INSERT INTO parking VALUES (8);
INSERT INTO parking VALUES (9);
INSERT INTO parking VALUES (10);

INSERT INTO roomessentials VALUES (1, 'BedSheet', 10);
INSERT INTO roomessentials VALUES (2, 'Shampoo', 10);
INSERT INTO roomessentials VALUES (3, 'Towels', 12);
INSERT INTO roomessentials VALUES (4, 'MiniBar', 30);

-- INSERT INTO roomhasessentials VALUES (101, 1)
INSERT INTO roomhasessentials VALUES (101, 2);
INSERT INTO roomhasessentials VALUES (101, 3);
INSERT INTO roomhasessentials VALUES (101, 4);
INSERT INTO roomhasessentials VALUES (102, 1);
INSERT INTO roomhasessentials VALUES (102, 2);
INSERT INTO roomhasessentials VALUES (102, 3);
INSERT INTO roomhasessentials VALUES (102, 4);
INSERT INTO roomhasessentials VALUES (103, 1);
INSERT INTO roomhasessentials VALUES (103, 2);
INSERT INTO roomhasessentials VALUES (103, 3);
INSERT INTO roomhasessentials VALUES (103, 4);
INSERT INTO roomhasessentials VALUES (104, 1);
INSERT INTO roomhasessentials VALUES (104, 2);
INSERT INTO roomhasessentials VALUES (104, 3);
INSERT INTO roomhasessentials VALUES (104, 4);
INSERT INTO roomhasessentials VALUES (105, 1);
INSERT INTO roomhasessentials VALUES (105, 2);
INSERT INTO roomhasessentials VALUES (105, 3);
INSERT INTO roomhasessentials VALUES (105, 4);

INSERT INTO roomhasessentials VALUES (201, 1);
INSERT INTO roomhasessentials VALUES (201, 2);
INSERT INTO roomhasessentials VALUES (201, 3);
INSERT INTO roomhasessentials VALUES (201, 4);
-- INSERT INTO roomhasessentials VALUES (202, 1)
INSERT INTO roomhasessentials VALUES (202, 2);
INSERT INTO roomhasessentials VALUES (202, 3);
INSERT INTO roomhasessentials VALUES (202, 4);
INSERT INTO roomhasessentials VALUES (203, 1);
INSERT INTO roomhasessentials VALUES (203, 2);
INSERT INTO roomhasessentials VALUES (203, 3);
INSERT INTO roomhasessentials VALUES (203, 4);
INSERT INTO roomhasessentials VALUES (204, 1);
INSERT INTO roomhasessentials VALUES (204, 2);
INSERT INTO roomhasessentials VALUES (204, 3);
INSERT INTO roomhasessentials VALUES (204, 4);
INSERT INTO roomhasessentials VALUES (205, 1);
INSERT INTO roomhasessentials VALUES (205, 2);
INSERT INTO roomhasessentials VALUES (205, 3);
INSERT INTO roomhasessentials VALUES (205, 4);


INSERT INTO roomhasessentials VALUES (301, 1);
INSERT INTO roomhasessentials VALUES (301, 2);
INSERT INTO roomhasessentials VALUES (301, 3);
INSERT INTO roomhasessentials VALUES (301, 4);
INSERT INTO roomhasessentials VALUES (302, 1);
INSERT INTO roomhasessentials VALUES (302, 2);
INSERT INTO roomhasessentials VALUES (302, 3);
INSERT INTO roomhasessentials VALUES (302, 4);
-- INSERT INTO roomhasessentials VALUES (303, 1)
INSERT INTO roomhasessentials VALUES (303, 2);
INSERT INTO roomhasessentials VALUES (303, 3);
INSERT INTO roomhasessentials VALUES (303, 4);
INSERT INTO roomhasessentials VALUES (304, 1);
INSERT INTO roomhasessentials VALUES (304, 2);
INSERT INTO roomhasessentials VALUES (304, 3);
INSERT INTO roomhasessentials VALUES (304, 4);
INSERT INTO roomhasessentials VALUES (305, 1);
INSERT INTO roomhasessentials VALUES (305, 2);
INSERT INTO roomhasessentials VALUES (305, 3);
INSERT INTO roomhasessentials VALUES (305, 4);


INSERT INTO roomhasessentials VALUES (401, 1);
INSERT INTO roomhasessentials VALUES (401, 2);
INSERT INTO roomhasessentials VALUES (401, 3);
INSERT INTO roomhasessentials VALUES (401, 4);
INSERT INTO roomhasessentials VALUES (402, 1);
INSERT INTO roomhasessentials VALUES (402, 2);
INSERT INTO roomhasessentials VALUES (402, 3);
INSERT INTO roomhasessentials VALUES (402, 4);
INSERT INTO roomhasessentials VALUES (403, 1);
INSERT INTO roomhasessentials VALUES (403, 2);
INSERT INTO roomhasessentials VALUES (403, 3);
INSERT INTO roomhasessentials VALUES (403, 4);
INSERT INTO roomhasessentials VALUES (404, 1);
-- INSERT INTO roomhasessentials VALUES (404, 2)
INSERT INTO roomhasessentials VALUES (404, 3);
INSERT INTO roomhasessentials VALUES (404, 4);
INSERT INTO roomhasessentials VALUES (405, 1);
INSERT INTO roomhasessentials VALUES (405, 2);
INSERT INTO roomhasessentials VALUES (405, 3);
INSERT INTO roomhasessentials VALUES (405, 4);


INSERT INTO roomhasessentials VALUES (501, 1);
INSERT INTO roomhasessentials VALUES (501, 2);
INSERT INTO roomhasessentials VALUES (501, 3);
INSERT INTO roomhasessentials VALUES (501, 4);
INSERT INTO roomhasessentials VALUES (502, 1);
INSERT INTO roomhasessentials VALUES (502, 2);
INSERT INTO roomhasessentials VALUES (502, 3);
INSERT INTO roomhasessentials VALUES (502, 4);
INSERT INTO roomhasessentials VALUES (503, 1);
INSERT INTO roomhasessentials VALUES (503, 2);
INSERT INTO roomhasessentials VALUES (503, 3);
INSERT INTO roomhasessentials VALUES (503, 4);
INSERT INTO roomhasessentials VALUES (504, 1);
INSERT INTO roomhasessentials VALUES (504, 2);
INSERT INTO roomhasessentials VALUES (504, 3);
INSERT INTO roomhasessentials VALUES (504, 4);
INSERT INTO roomhasessentials VALUES (505, 1);
INSERT INTO roomhasessentials VALUES (505, 2);
--INSERT INTO roomhasessentials VALUES (505, 3)
INSERT INTO roomhasessentials VALUES (505, 4);


