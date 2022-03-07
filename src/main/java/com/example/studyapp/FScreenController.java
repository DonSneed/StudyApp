package com.example.studyapp;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Spinner;
import javafx.scene.control.TextField;

public class FScreenController {

    @FXML
    public Label heaader;

    @FXML
    public Label FKLabel;

    @FXML
    public Button editFKB;

    @FXML
    public Button addFKB;

    @FXML
    public Button delFKB;

    @FXML
    public Button cancelAddB;

    @FXML
    public Button confirmAddB;

    @FXML
    public Spinner<String> FKSpinner;

    @FXML
    public TextField addFKField;

    public void setupFK(){

    }

    public void addFKB(){
        editFKB.setVisible(false);
        delFKB.setVisible(false);
        addFKB.setVisible(false);
        confirmAddB.setVisible(true);
        addFKField.setVisible(true);
        cancelAddB.setVisible(true);
    }

    public void cancelAdd(){
        cancelAddB.setVisible(false);
        addFKField.clear();
        addFKField.setVisible(false);
        confirmAddB.setVisible(false);
        addFKB.setVisible(true);
        editFKB.setVisible(true);
        delFKB.setVisible(true);
    }

    public void confirmAdd(){

    }


}
