package com.example.studyapp;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class StudyApp extends Application {

    public static ArrayList<User> users = new ArrayList<User>();
    public static User currentUser;

    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(StudyApp.class.getResource("login.fxml"));
        Scene scene = new Scene(fxmlLoader.load());
        uListeAnlegen();
        String css = getClass().getResource("login.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) throws IOException{
        launch();
    }
    public void uListeAnlegen()throws IOException{
        BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\A200016642\\Betrieb\\Projekte\\Javafx\\StudyApp\\src\\main\\resources\\UList.txt"));
        String dataLine = br.readLine();
        while(dataLine != null){
            String[] userData = dataLine.split(",", 4);
            User admin0 = new User(users.size(), userData[0], userData[1], userData[2], userData[3].equals("true"));
            users.add(admin0);
            dataLine = br.readLine();
        }

    }
}