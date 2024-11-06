package com.controller;

import com.entity.StudentEntity;
import com.repository.StudentRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/admin")
public class StudentController {

    @Autowired
    StudentRepository studentRepo;

    @PostMapping("/addstudent")
    public ResponseEntity<?> addStudent(@RequestBody StudentEntity entity) {
        studentRepo.save(entity);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/getStudentByName")
    public ResponseEntity<?> getStudentByName(@RequestParam String characters) {
        if (characters == null || characters.length() < 1) {
            return ResponseEntity.ok("No Student Found");
        }
        List<StudentEntity> students = studentRepo.findByNameStartingWith(characters);
        return ResponseEntity.ok(students); 
    }

    @GetMapping("/getStudentById/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Integer id){
        Optional<StudentEntity> op = studentRepo.findById(id);
        if(op.isPresent()){
            return ResponseEntity.ok(op.get());
        }
        return ResponseEntity.ok("Student not found");
    }
}
;