package com.example.studyapp;

import java.util.ArrayList;

public class User {
    private int uNumber;
    private String uName;
    private String password;
    private String standort;
    private boolean admin;
    public ArrayList<Topic> topics;


    public User(int a, String b, String c, String d, boolean e){
        this.uNumber = a;
        this.uName = b;
        this.password = c;
        this.standort = d;
        this.admin = e;
        topics = new ArrayList<Topic>();
    }

    public int getuNumber(){
        return this.uNumber;
    }

    public String getUNumberAsString(){
        return ""+ this.uNumber + "";
    }

    public String getuName(){
        return this.uName;
    }

    public String getPassword(){
        return this.password;
    }

    public String getStandort(){
        return this.standort;
    }

    public String getAdminAsString(){
        if(this.admin){
            return "true";
        }else{
            return "false";
        }
    }

}
