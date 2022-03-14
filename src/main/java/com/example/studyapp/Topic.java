package com.example.studyapp;

import java.io.*;
import java.util.ArrayList;

public class Topic {
    public String name;
    public boolean school;
    public String txtLocation;
    public ArrayList<Fragenkatalog> fKNames;


    public Topic(String name){
        this.name = name;
        fKNames = new ArrayList<Fragenkatalog>();
    }
    public Topic(String name, String pathName){
        this.name = name;
        this.txtLocation = pathName;
        fKNames = new ArrayList<Fragenkatalog>();
    }
    public void setTxt(String txtLocation){
        this.txtLocation = txtLocation;
    }
    public String getTxtLocation(){
        return this.txtLocation;
    }

    public String getName(){
        return this.name;
    }


}
