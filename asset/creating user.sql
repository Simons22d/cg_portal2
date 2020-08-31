CREATE USER 'db'@'localhost';
SET PASSWORD FOR 'db'@'localhost' = PASSWORD('Japanitoes');

GRANT SELECT ON site.* TO 'db'@'localhost';

-- creating the addItem table
CREATE TABLE product (
    id varchar(20) not null,
    name text not null,
    price varchar(20) not null,
    color varchar(255) not null,
    engine_size varchar(20) not null,
    state varchar(20) not null,
    cover varchar(20) not null,
    make varchar(255) not null,
    origin varchar(255) not null,
    year int(4) not null,
    fuel_type varchar(20) not null,
    fuel_capacity int(5) not null,
    units int(10) not null,
    country varchar(5) not null,
    branch varchar(255) not null,
    leaseable varchar(40) not null,
    PRIMARY KEY(id)
);


create table lease(
    id varchar(20) not null,
    item_id varchar(20) not null,
    item_name varchar(20) not null,
    given varchar(20) not null,
    due varchar(20) not null,
    item_state varchar(20) not null,
    employee_id varchar(20) not null,
    designation varchar(20) not null,
    reason varchar(30) not null,
    leeser varchar(30) not null,
    primary key(id)
);
create table user(
    id varchar(20) not null,
    firstname varchar(200) not null,
    lastname varchar(200) not null,
    email varchar(200) not null,
    phone varchar(20) not null,
    country varchar(40) not null, --
    branch varchar(40) not null,
    designation varchar(40) not null,
    emp_status varchar(40) not null,
    password varchar(255) not null,
    primary key(id)
);

CREATE TABLE leased(
    item_id varchar(10) not null,
    user_id varchar(10) not null,
    status varchar(20) not null,
    due_date varchar(20) not null,
    reason  text not null,
    primary key(item_id)
);