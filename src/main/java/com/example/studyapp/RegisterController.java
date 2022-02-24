package com.example.studyapp;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class RegisterController {

    @FXML
    TextField uNameField;
    @FXML
    TextField pwField;
    @FXML
    TextField pw2Field;
    @FXML
    TextField standortField;
    @FXML
    Label errorMsg;

    private Stage stage;
    private Scene scene;
    private Parent root;



    public void abmelden(ActionEvent event)throws IOException{
        root = FXMLLoader.load(getClass().getResource("login.fxml"));
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        scene = new Scene(root);
        String css = getClass().getResource("login.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
    }

    public void register(ActionEvent event)throws IOException{

        User newU = new User(StudyApp.users.size(), uNameField.getText(), pwField.getText(), standortField.getText(), false);
        if(checkNewUser()){
            addUserToList(newU);
            FXMLLoader loader = new FXMLLoader(getClass().getResource("registeredScreen.fxml"));
            root = loader.load();
            RegSceenController regSceenController = loader.getController();
            regSceenController.displayUsername();
            stage = (Stage)((Node)event.getSource()).getScene().getWindow();
            scene = new Scene(root);
            String css = getClass().getResource("Register.css").toExternalForm();
            scene.getStylesheets().add(css);

            stage.setScene(scene);
            stage.show();
        }



    }

    public void displayUnameErr(){
        errorMsg.setText("Username bereits vergeben");
    }
    public void emptyFieldErr(){
        errorMsg.setText("Text fields have to be filled out");
    }

    public void pwMatchError(){
        errorMsg.setText("Bitte bestätigen Sie ihr Passwort");
    }

    public boolean checkNewUser(){
        if (uNameField.getText().equals("") || pwField.getText().equals("")||pw2Field.getText().equals("")||standortField.getText().equals("")){
            emptyFieldErr();
            return false;
        }
        for (int i = 0; i < StudyApp.users.size(); i++){
            if (uNameField.getText().equals(StudyApp.users.get(i).getuName())){
                displayUnameErr();
                return false;
            }
        }
        if (!pwField.getText().equals(pw2Field.getText())){
            pwMatchError();
            return false;
        }
        return true;
    }
    public void addUserToList(User newUser)throws IOException{
        FileWriter fw = new FileWriter("src\\main\\resources\\UserData\\UList.txt", true);
        fw.write("\r\n" + newUser.getuName() + "," + newUser.getPassword() + "," + newUser.getStandort() + "," + newUser.getAdminAsString());
        fw.close();
        new File("src\\main\\resources\\UserData\\" + newUser.getuName()).mkdirs();
        StudyApp.users.add(newUser);
        errorMsg.setText("Profil erstellt");
    }


}