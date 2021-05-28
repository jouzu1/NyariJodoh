package com.juaracoding.perpustakaan.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="buku")
public class Buku {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String judulBuku;
	private int jumlahHalaman;
	private String namaPenulis;
}
