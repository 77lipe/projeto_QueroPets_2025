create table tbl_usuario(
	id int not null primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    palavra_chave varchar(100) not null,
    data_nascimento date not null,
    cpf varchar(11) not null,
    id_endereco int,
    
    constraint FK_ENDERECO_USUARIO
    foreign key (id_endereco)
    references tbl_endereco(id)
);

create table tbl_endereco(
	id int not null primary key auto_increment,
    cidade varchar(100) not null,
    estado varchar(24)
);

create table tbl_contato(
	id int not null primary key auto_increment,
    telefone varchar(100) not null,
    id_usuario int,
    
    constraint FK_CONTATO_USUARIO
    foreign key (id_usuario)
    references tbl_usuario(id)
)