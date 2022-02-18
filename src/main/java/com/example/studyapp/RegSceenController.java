package com.example.studyapp;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

import java.io.IOException;

public class RegSceenController {

    @FXML
    Label header;

    private User user;
    private Stage stage;
    private Scene scene;
    private Parent root;

    public void displayName(String name){
        header.setText("Hello " + name);
    }

    public void displayUsername(){
        header.setText("Hello " + StudyApp.users.get(StudyApp.users.size() - 1).getuName());
    }
    public void abmelden(ActionEvent event)throws IOException {
        root = FXMLLoader.load(getClass().getResource("login.fxml"));
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        scene = new Scene(root);
        String css = getClass().getResource("login.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
    }

}
