-- Création de la séquence pour user_generator
CREATE SEQUENCE user_generator START WITH 1 INCREMENT BY 1;

-- Création de la table airbnb_user
CREATE TABLE airbnb_user (
    id BIGINT PRIMARY KEY NOT NULL,
    public_id UUID NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    image_url VARCHAR(256),
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    CONSTRAINT ux_user_email UNIQUE (email)
);

-- Création de la table authority
CREATE TABLE authority (
    name VARCHAR(50) PRIMARY KEY NOT NULL
);

-- Création de la table user_authority
CREATE TABLE user_authority (
    user_id BIGINT NOT NULL,
    authority_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, authority_name)
);

-- Ajout des contraintes de clé étrangère
ALTER TABLE user_authority ADD CONSTRAINT fk_authority_name FOREIGN KEY (authority_name) REFERENCES authority(name);
ALTER TABLE user_authority ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES airbnb_user(id);

-- Création de la séquence pour listing_generator
CREATE SEQUENCE listing_generator START WITH 1 INCREMENT BY 1;

-- Création de la table listing
CREATE TABLE listing (
    id BIGINT PRIMARY KEY NOT NULL,
    public_id UUID NOT NULL UNIQUE,
    title VARCHAR(256) NOT NULL,
    description VARCHAR(256) NOT NULL,
    guests INT NOT NULL,
    bedrooms INT NOT NULL,
    beds INT NOT NULL,
    bathrooms INT NOT NULL,
    price INT NOT NULL,
    category VARCHAR(256) NOT NULL,
    location VARCHAR(256) NOT NULL,
    landlord_public_id UUID NOT NULL,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP
);

-- Ajout de la contrainte de clé étrangère pour landlord_public_id
ALTER TABLE listing ADD CONSTRAINT fk_landlord_id FOREIGN KEY (landlord_public_id) REFERENCES airbnb_user(public_id);

-- Création de la séquence pour listing_picture_generator
CREATE SEQUENCE listing_picture_generator START WITH 1 INCREMENT BY 1;

-- Création de la table listing_picture
CREATE TABLE listing_picture (
    id BIGINT PRIMARY KEY NOT NULL,
    listing_fk BIGINT NOT NULL,
    file BYTEA NOT NULL,
    is_cover BOOLEAN NOT NULL,
    file_content_type VARCHAR(255) NOT NULL,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP
);

-- Ajout de la contrainte de clé étrangère pour listing_fk
ALTER TABLE listing_picture ADD CONSTRAINT fk_listing_id FOREIGN KEY (listing_fk) REFERENCES listing(id) ON DELETE CASCADE;
