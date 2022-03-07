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
import java.util.function.IntBinaryOperator;

public class MainMenueController implements Initializable{

    @FXML
    private Label header;
    @FXML
    private Label addTopicLabel;
    @FXML
    private TextField addTopicField;
    @FXML
    private Button hinzufuegenB;
    @FXML
    private Button editFKB;
    @FXML
    private Button deleteTopicB;
    @FXML
    private Button deleteTopicBN;
    @FXML
    private Button deleteTopicBY;
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
        header.setText("Hallo: " + username);
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
            if (!StudyApp.currentUser.topicNames.contains(txtFiles[i].getName().replace(".txt", ""))){
                StudyApp.currentUser.topicNames.add(txtFiles[i].getName().replace(".txt", ""));
            }
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
        editFKB.setVisible(false);
        deleteTopicB.setVisible(false);
        addTopicLabel.setVisible(true);
        addTopicLabel.setText("Thema eingeben:");
        addTopicField.setVisible(true);
        hinzufuegenB.setVisible(true);
        header.setText("");
    }

    public void addTopic() throws IOException {


        if (checkTopic(addTopicField.getText())){
            Topic newT = new Topic(addTopicField.getText());
            String fileLocation = "src\\main\\resources\\UserData\\" + StudyApp.currentUser.getuName() + "\\" + addTopicField.getText() + ".txt";
            File topicFile = new File(fileLocation);
            if (topicFile.createNewFile()){
                newT.setTxt(fileLocation);
                StudyApp.currentUser.topics.add(newT);
                StudyApp.currentUser.topicNames.add(newT.getName().replace(".txt", ""));

                addTopicLabel.setText("Thema wurde angelegt");
                addTopicField.clear();
                displayTopic();
            }
            addTopicLabel.setTextFill(Color.web("#ea0a8e"));
            topics.add(newT.getName());
        }


    }

    public boolean checkTopic(String topicName){
        if (topicName.equals("")){
            addTopicLabel.setText("Feld darf nicht leer sein");
            addTopicLabel.setTextFill(Color.web("#de2834"));
            return false;
        }else{
            for (int i = 0; i < topics.size() -1; i++){
                if (topicName.equals(topics.get(i))){
                    addTopicLabel.setText("Thema existiert bereits");
                    addTopicLabel.setTextFill(Color.web("#de2834"));
                    return false;
                }
            }
        }
        return true;
    }

    public void editTopic(){
        addTopicLabel.setVisible(false);
        addTopicField.setVisible(false);
        hinzufuegenB.setVisible(false);
        editFKB.setVisible(true);
        deleteTopicB.setVisible(true);
        header.setText("");
    }

    public void deleteTopic(){
        editFKB.setVisible(false);
        deleteTopicB.setVisible(false);
        addTopicLabel.setText("Sind Sie sicher, dass Sie das Thema inklusive aller gespeicherten Ressourcen löschen möchten?");
        addTopicLabel.setVisible(true);
        deleteTopicBY.setVisible(true);
        deleteTopicBN.setVisible(true);
    }
    public void cancelDelTopic(){
        editFKB.setVisible(true);
        deleteTopicB.setVisible(true);
        addTopicLabel.setText("");
        addTopicLabel.setVisible(false);
        deleteTopicBY.setVisible(false);
        deleteTopicBN.setVisible(false);
    }
    public void confirmDelTopic(){
        for (int i= 0; i < topics.size(); i++){
            if (topics.get(i).equals(topicSpinner.getValue())){
                File file = new File("src\\main\\resources\\UserData\\" + StudyApp.currentUser.getuName() + "\\" + topicSpinner.getValue() + ".txt");
                file.delete();
                topics.remove(i);
                StudyApp.currentUser.topicNames.remove(i);

            }
        }
        editFKB.setVisible(true);
        deleteTopicB.setVisible(true);
        addTopicLabel.setText("");
        addTopicLabel.setVisible(false);
        deleteTopicBY.setVisible(false);
        deleteTopicBN.setVisible(false);

    }

    public void goFKScreen(ActionEvent event)throws IOException {
        root = FXMLLoader.load(getClass().getResource("fScreen.fxml"));
        stage = (Stage) header.getScene().getWindow();
        scene = new Scene(root);
        String css = getClass().getResource("login.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
    }


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        setupTopics();
        if (StudyApp.currentUser.topicNames.size() > 0){
            valueFactory.setValue(StudyApp.currentUser.topicNames.get(0).replace(".txt", ""));
        }
        topicSpinner.setValueFactory(valueFactory);
        currentValue = topicSpinner.getValue();
        topicSpinner.valueProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observableValue, String s, String t1) {
                currentValue = topicSpinner.getValue();
            }
        });
    }

    public void displayTopic(){
        valueFactory.setValue(StudyApp.currentUser.topicNames.get(StudyApp.currentUser.topicNames.size()-1));
        topicSpinner.setValueFactory(valueFactory);
    }
}