package com.example.studyapp;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class User {

    private int index;
    private String uName;
    private String pw;
    private ArrayList<Integer> Scores;

    public User(String uName, String pw){
        this.uName = uName;
        this.pw = pw;
    }

    public String getuName(){
        return this.uName;
    }

    public String getPw(){
        return this.pw;
    }
}
