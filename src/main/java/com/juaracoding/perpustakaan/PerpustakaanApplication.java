package com.juaracoding.perpustakaan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.juaracoding.perpustakaan.entity.DataUser;
import com.juaracoding.perpustakaan.repository.DataUserRepository;

@SpringBootApplication
public class PerpustakaanApplication implements CommandLineRunner{
	@Autowired
	DataUserRepository userRepo;
	public static void main(String[] args) {
		SpringApplication.run(PerpustakaanApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
//		DataUser user = new DataUser();
//		user.setName("Test");
//		this.userRepo.save(user);
	}
	
}
