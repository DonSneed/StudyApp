package com.example.studyapp;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class MainMenueController implements Initializable{

    @FXML
    private Label header;
    @FXML
    private Label addTopicLabel;
    @FXML
    private Label topicLabel;
    @FXML
    private TextField addTopicField;
    @FXML
    private Button hinzufuegenB;
    @FXML
    private Spinner<String> topicSpinner;

    private Stage stage;
    private Scene scene;
    private Parent root;
    private int currentTopic;
    private String currentValue;
    private ObservableList<String> topics;
    private SpinnerValueFactory<String> valueFactory;


    public void displayName(String username){
        header.setText("Hello: " + username);
    }

    public void setupTopics() {
        File directory = new File("src\\main\\resources\\UserData\\" + StudyApp.currentUser.getuName());
        FileFilter filter = new FileFilter() {
            @Override
            public boolean accept(File directory) {
                return directory.getName().endsWith(".txt");
            }
        };
        File[] txtFiles = directory.listFiles(filter);
        for (int i = 0; i < txtFiles.length; i++){
            StudyApp.currentUser.topicNames.add(txtFiles[i].getName());
        }
        topics = FXCollections.observableArrayList(StudyApp.currentUser.topicNames);
        valueFactory = new SpinnerValueFactory.ListSpinnerValueFactory<>(topics);

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

    public void addTopic() throws IOException {


        if (!addTopicField.getText().equals("")){
            Topic newT = new Topic(addTopicField.getText());
            String fileLocation = "src\\main\\resources\\UserData\\" + StudyApp.currentUser.getuName() + "\\" + addTopicField.getText() + ".txt";
            File topicFile = new File(fileLocation);
            if (topicFile.createNewFile()){
                newT.setTxt(fileLocation);
                StudyApp.currentUser.topics.add(newT);
                StudyApp.currentUser.topicNames.add(newT.getName());

                addTopicLabel.setText("Thema wurde angelegt");
                addTopicField.clear();
                displayTopic();
            }
            StudyApp.currentUser.topics.add(newT);
            StudyApp.currentUser.topicNames.add(newT.getName());
            topics.add(newT.getName());
        }else{
            addTopicLabel.setText("Feld darf nicht leer sein");
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


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        setupTopics();
        if (StudyApp.currentUser.topicNames.size() > 0){
            valueFactory.setValue(StudyApp.currentUser.topicNames.get(0));
        }
        topicSpinner.setValueFactory(valueFactory);
        currentValue = topicSpinner.getValue();
        topicLabel.setText(currentValue);
        topicSpinner.valueProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observableValue, String s, String t1) {
                currentValue = topicSpinner.getValue();
                topicLabel.setText(currentValue);
            }
        });
    }

    public void displayTopic(){
        topicLabel.setText(StudyApp.currentUser.topics.get(StudyApp.currentUser.topics.size()-1).getName());
        valueFactory.setValue(StudyApp.currentUser.topicNames.get(StudyApp.currentUser.topicNames.size()-1));
        topicSpinner.setValueFactory(valueFactory);
    }
}