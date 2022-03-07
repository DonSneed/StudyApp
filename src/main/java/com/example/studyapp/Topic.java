package com.example.studyapp;

import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;

public class Topic {
    public String name;
    public boolean school;
    public String txtLocation;
    public ArrayList<String> FKNames;


    public Topic(String name){
        this.name = name;
    }
    public void setTxt(String txtLocation){
        this.txtLocation = txtLocation;
    }

    public String getName(){
        return this.name;
    }
}
