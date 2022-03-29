package com.example.studyapp;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

import java.io.IOException;

public class LoginController {

    @FXML
    private TextField uNameField;

    @FXML
    private TextField pwField;

    @FXML
    private AnchorPane scenePane;

    @FXML
    private Button logoutButton;

    @FXML
    private Label errMsg;

    private Stage stage;
    private Scene scene;
    private Parent root;

    public void login(ActionEvent event)throws IOException {

        if (checkLoginInfo()){
            assignUser();
            FXMLLoader loader = new FXMLLoader(getClass().getResource("mainMenue.fxml"));
            root = loader.load();
            MainMenueController mainMenueController = loader.getController();
            mainMenueController.setupTopics();
            mainMenueController.displayName(StudyApp.currentUser.getuName());
            stage = (Stage)((Node)event.getSource()).getScene().getWindow();
            scene = new Scene(root);

            String css = getClass().getResource("MainMenue.css").toExternalForm();
            scene.getStylesheets().add(css);
            stage.setScene(scene);
            stage.show();


            //errMsg.setText("Hello " + currentUser.getuName());
        }else {
            uNameField.clear();
            pwField.clear();
        }



        /*String username = uName.getText();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("mainMenue.fxml"));
        root = loader.load();

        MainMenueController mainMenueController = loader.getController();
        mainMenueController.displayName(username);
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        scene = new Scene(root);

        String css = getClass().getResource("MainMenue.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();*/
    }

    public void register(ActionEvent event)throws IOException{
        root = FXMLLoader.load(getClass().getResource("register.fxml"));
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        scene = new Scene(root);
        String css = getClass().getResource("Register.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
    }

    public void exitApp(ActionEvent event){

        Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
        alert.setTitle("Programm beenden");
        alert.setHeaderText("Sind Sie sicher, dass sie das Programm beenden und zum Desktop zurückkehren möchten?");

        if (alert.showAndWait().get() == ButtonType.OK) {
            stage = (Stage) scenePane.getScene().getWindow();
            stage.close();
        }
    }

    public boolean checkLoginInfo(){
        String currentUName = uNameField.getText();
        for (int i = 0; i < StudyApp.users.size(); i++){
            if (currentUName.equals(StudyApp.users.get(i).getuName())){
                if (pwField.getText().equals(StudyApp.users.get(i).getPassword())){
                    return true;
                }else{
                    errMsg.setText("Falsches Passwort");
                    return false;
                }
            }
        }
        errMsg.setText("Falscher Benutzername");
        return false;
    }

    public void assignUser(){
        String uName = uNameField.getText();
        for (int i = 0; i < StudyApp.users.size(); i++){
            if (uName.equals(StudyApp.users.get(i).getuName())){
                StudyApp.currentUser = StudyApp.users.get(i);
            }
        }
    }
}