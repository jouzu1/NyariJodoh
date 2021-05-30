package com.juaracoding.perpustakaan.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.juaracoding.perpustakaan.entity.Buku;
import com.juaracoding.perpustakaan.entity.DataUser;
import com.juaracoding.perpustakaan.entity.Laporan;
import com.juaracoding.perpustakaan.repository.DataUserRepository;
import com.juaracoding.perpustakaan.utility.FileUtility;

@RestController
@RequestMapping("/user")
public class DataUserController {
	@Autowired
	DataUserRepository dataRepo;

	@GetMapping("/")
	public List<DataUser> getAll() {
		return dataRepo.findAll();
	}

	@GetMapping("/login/")
	public DataUser loginUser(@RequestParam("username")String username, @RequestParam("nomorhp") String nomorhp) {
		return dataRepo.findByLogin(username, nomorhp);
	}


//	@GetMapping("/searchby/{type}/{value}")
//	public List<DataUser> getSearchBy(@PathVariable("type")String type, @PathVariable("value") String value) {
//		return dataRepo.findBySearchBy(type, value);
//	}

	@GetMapping("/name/{value}")
	public DataUser getByName(@PathVariable("value") String value) {
		return dataRepo.findByName(value);
	}
	
	@GetMapping(value = "/image/{name}", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String name) throws IOException {
	   final InputStream in = getClass().getResourceAsStream("/user-photo/"+name);
//	   System.out.printf("ini adalah input stream" , in.hashCode());
	   return IOUtils.toByteArray(in);
	   
	}
	
	@PostMapping("/register")
	public String addLaporan (@RequestParam(value="file")MultipartFile images, @ModelAttribute(value="data") String dataJson) throws IOException {
		String fileName = StringUtils.cleanPath(images.getOriginalFilename());
		
		String uploadDir = "src/main/java/user-photo/";
		FileUtility.saveFile(uploadDir, fileName, images);
		DataUser user = new Gson().fromJson(dataJson, DataUser.class);
		
//		if(lapor.getKejadian().equalsIgnoreCase("bencana")) {
//			lapor.setStatus("bencana");
//		}else {
//			lapor.setStatus("kriminal");
//		}
		user.setImage(fileName);
//		Date date = new Date();
//		lapor.setJam(String.valueOf(date.getHours())+":"+String.valueOf(date.getMinutes()));
		this.dataRepo.save(user);
		return "Berhasil memasukan data";
	}
//	@PostMapping("/register/")
//	public String addUser(@RequestBody DataUser user) {
//		dataRepo.save(user);
//		return "Insert Berhasil";
//	}
	
	@PostMapping("/register/{id}")
	public String updateUser(@PathVariable String id, @RequestBody DataUser user) {
		user.setId(Long.parseLong(id));
		dataRepo.save(user);
		return "Update Berhasil";
	}
}
