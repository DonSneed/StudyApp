package com.example.studyapp;

import java.util.ArrayList;

public class Katalog {
    private String name;
    private int size;
    private int katID;
    public ArrayList<String> questions = new ArrayList<String>();
    public ArrayList<String> a1 = new ArrayList<String>();
    public ArrayList<String> a2 = new ArrayList<String>();
    public ArrayList<String> a3 = new ArrayList<String>();
    public ArrayList<String> a4 = new ArrayList<String>();
    public ArrayList<String> a5 = new ArrayList<String>();
    public ArrayList<String> results = new ArrayList<String>();
    

    public Katalog(String name){
        this.name = name;
    }

    public Katalog(String name, int katID, ArrayList<String> questions, ArrayList<String> a1, ArrayList<String> a2, ArrayList<String> a3, ArrayList<String> a4, ArrayList<String> a5, ArrayList<String> results){
        this.name = name;
        this.questions = questions;
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.a4 = a4;
        this.a5 = a5;
        this.results = results;
        this.katID = katID;
        this.size = questions.size();
    }

    public String getName(){
        return this.name;
    }
     public int getSize(){
        return this.size;
     }
}
