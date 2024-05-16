-- create database diplom_project_site;


create table users
(
    id         serial primary key not null,
    email      varchar(255)       not null unique,
    password   varchar(255)       not null,
    role       varchar(255)       not null,
    first_name varchar(255),
    born_date  date               not null,
    jwt        text,
    bonus      int default (0)
);

insert into users (email, password, role, first_name, born_date)
VALUES ('alex', '$2a$12$mmvg.Lv/Xhi4n1R0sEjC0OXkLN.kmWVVzwx5TNamS4fqaMKXTZcTW', 'user', 'alex', '12.04.2004');

create table address_user
(
    id       serial primary key not null,
    user_id  int references users (id),
    street   varchar(255)       not null,
    entrance int                not null,
    number   int                not null,
    floor    int                not null,
    flat     int                not null,
    comment  text
);

create table cart
(
    id       serial primary key not null,
    user_id  int references users (id),
    number   varchar                not null,
    date     varchar(5)         not null,
    security int                not null
);

insert into cart (user_id, number, date, security) VALUES (1,1111111111111111,'11/11',111);

insert into address_user(user_id, street, entrance, number, floor, flat)
VALUES (1, 'Бауржан Момышулы 15', '8', '155', '8', '155');

create table category
(
    id   serial primary key not null,
    name varchar(255)       not null
);

INSERT INTO category (name)
VALUES ('Завтраки'),
       ('Обеды'),
       ('Ужины'),
       ('Напитки'),
       ('Десерты');


create table tag
(
    id   serial primary key not null,
    name varchar(255)       not null
);

insert into tag (name)
values ('Хит'),
       ('Новинка');

create table product
(
    id          serial primary key           not null,
    category_id int references category (id) not null,
    name        varchar(255)                 not null,
    price       int                          not null,
    img         varchar(255),
    rating      decimal,
    weight      int,
    description text
);

INSERT INTO product (category_id, name, price, img, rating, weight, description)
VALUES (1, 'Омлет', 250, '1.jpg', 4.5, 200, 'Сочный омлет с травами и сыром.'),
       (2, 'Паста карбонара', 350, '1.jpg', 4.8, 300, 'Итальянская паста с беконом и сливочным соусом.'),
       (3, 'Стейк из говядины', 600, '1.jpg', 4.9, 400, 'Нежный стейк, подается с овощами и картошкой.'),
       (4, 'Мохито', 150, '1.jpg', 4.7, NULL, 'Освежающий коктейль с мятой и лаймом.'),
       (5, 'Тирамису', 200, '1.jpg', 4.6, 150, 'Классический итальянский десерт на основе маскарпоне и кофе.');


create table product_tag
(
    id         serial primary key          not null,
    tag_id     int references tag (id)     not null,
    product_id int references product (id) not null
);

insert into product_tag (tag_id, product_id)
VALUES (1, 1),
       (2, 1);

create table restaurant
(
    id         serial primary key not null,
    place      varchar(255)       not null,
    date_start time               not null,
    date_end   time               not null,
    phone      varchar(255)       not null,
    img        varchar(255)
);

INSERT INTO restaurant (place, date_start, date_end, phone, img)
VALUES ('Ресторан "У Реки"', '09:00:00', '22:00:00', '+7 (123) 456-7890', '2.jpg'),
       ('Кафе "Солнечное настроение"', '08:00:00', '20:00:00', '+7 (234) 567-8901', '2.jpg'),
       ('Пиццерия "Вкусная Пицца"', '11:00:00', '23:00:00', '+7 (345) 678-9012', '2.jpg');

create table history_bonus
(
    id       serial primary key not null,
    users_id int references users (id),
    date     timestamp          not null,
    bonus    int                not null
);

create table history_order
(
    id          serial primary key not null,
    product_id  int references product (id),
    users_id    int8 references users (id),
    cart_id int references cart (id),
    address_id int references cart(id),
    order_id int not null,
    count       int                not null default (1),
    total_price int                not null,
    active boolean default false not null,
    comment varchar(255),
    time_order  varchar(255) not null
);

insert into history_order (product_id, users_id, cart_id, address_id, order_id, count, total_price, active, comment, time_order) VALUES
                                                                                                                                     (1,1,1,1,4234,2,500,true,'hfghfghf','gfdgdfgdf');


create table orders
(
    id          serial primary key not null,
    product_id  int references product (id),
    users_id    int references users (id),
    count       int                not null default (1),
    total_price int                not null
);

insert into orders (product_id, users_id, count, total_price) VALUES
    (1,1,2,500);
insert into orders (product_id, users_id, count, total_price) VALUES
    (2,1,3,1000);

create table favorite_product
(
    id         serial primary key not null,
    product_id int references product (id),
    users_id   int references users (id)
);

insert into favorite_product (product_id, users_id) values
                                                        (1,1),
                                                        (2,1),
                                                        (3,1);