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

    public Fragenkatalog(String name){
        this.name = name;
        questions = new ArrayList<String>();
    }

    public Fragenkatalog(String name, int qAmount){
        this.name = name;
        this.qAmount = qAmount;
        questions = new ArrayList<String>();
    }

    public void setLineNr(int i){
        this.lineNr = i;
    }

    public void setTopic(Topic topic){
        this.topic = topic;
    }

    public String getName(){
        return this.name;
    }

    public String getTxtLocation(){
        return this.txtLocation;
    }

    public void addQuestion(String question){
        questions.add(question);
    }

}
