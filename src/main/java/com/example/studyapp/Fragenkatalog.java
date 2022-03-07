package com.example.studyapp;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class Fragenkatalog {
    public String name;
    public String txtLocation;
    public Topic topic;
    public int qAmount;
    public int lineNr;
    public User user;
    public ArrayList<String> questions;

    public Fragenkatalog(String name, String txtLocation){
        this.name = name;
        this.txtLocation = txtLocation;
    }

    public String getName(){
        return this.name;
    }

    public String getTxtLocation(){
        return this.txtLocation;
    }

    public Fragenkatalog(Topic topic, String name){

    }

}
