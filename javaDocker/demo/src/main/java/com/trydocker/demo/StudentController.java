package com.trydocker.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    StudentRepo repo;
    @RequestMapping("/getStudent")
    public List<Student> getStudent(){
        return repo.findAll();
    }
}
