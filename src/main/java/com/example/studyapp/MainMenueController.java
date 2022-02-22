package com.example.studyapp;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

import java.io.IOException;

public class MainMenueController {

    @FXML
    Label header;
    @FXML
    Label addTopicLabel;
    @FXML
    TextField addTopicField;
    @FXML
    Button hinzufuegenB;

    private Stage stage;
    private Scene scene;
    private Parent root;

    public void displayName(String username){
        header.setText("Hello: " + username);
    }

    public void abmelden(ActionEvent event)throws IOException{
        root = FXMLLoader.load(getClass().getResource("login.fxml"));
        stage = (Stage) header.getScene().getWindow();
        scene = new Scene(root);
        String css = getClass().getResource("login.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
        StudyApp.currentUser = null;
    }

    public void enterTopic(){
        addTopicLabel.setVisible(true);
        addTopicField.setVisible(true);
        hinzufuegenB.setVisible(true);
    }

    public void addTopic(){


        if (addTopicField.getText() != null && checkTopic(addTopicField.getText())){
            Topic newT = new Topic(addTopicField.getText());
            StudyApp.currentUser.topics.add(newT);
        }else{
            addTopicLabel.setText("unzulässige Eingabe");
            addTopicLabel.setTextFill(Color.web("#de2834"));
        }


    }

    public boolean checkTopic(String topicName){
        for (int i = 0; i < StudyApp.currentUser.topics.size(); i++){
            if (StudyApp.currentUser.topics.get(i).equals(topicName)){
                return false;
            }
        }
        return true;
    }




}