-- create database diplom_project_site;


create table users
(
    id         serial primary key not null,
    email      varchar(255)       not null unique,
    password   varchar(255)       not null,
    role       varchar(255)       not null,
    first_name varchar(255),
    bonus      int default (0)
);


create table category
(
    id   serial primary key not null,
    name varchar(255)       not null
);

create table tag
(
    id   serial primary key not null,
    name varchar(255)       not null
);

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

create table product_tag
(
    id         serial primary key          not null,
    tag_id     int references tag (id)     not null,
    product_id int references product (id) not null
);

create table restaurant
(
    id         serial primary key not null,
    place      varchar(255)       not null,
    date_start time               not null,
    date_end   time               not null,
    phone      varchar(255)       not null,
    img        varchar(255)
);

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
    count       int                not null default (1),
    total_price int                not null
);


create table orders
(
    id          serial primary key not null,
    product_id  int references product (id),
    users_id    int references users (id),
    count       int                not null default (1),
    total_price int                not null
);

create table favorite_product
(
    id         serial primary key not null,
    product_id int references product (id),
    users_id   int references users (id)
);