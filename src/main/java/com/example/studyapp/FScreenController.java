package com.example.studyapp;

import javafx.animation.PauseTransition;
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
import javafx.stage.Stage;
import javafx.util.Duration;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;

public class FScreenController implements Initializable {

    @FXML
    public Label header;
    @FXML
    public Label fKLabel;
    @FXML
    public Label notificationLabel;
    @FXML
    public Button startFKB;
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
    public Spinner<String> fKSpinner;
    @FXML
    public TextField addFKField;

    private Stage stage;
    private Scene scene;
    private Parent root;


    public ObservableList<String> fkList;

    public SpinnerValueFactory<String> valueFactory;



    public void setupFK()throws IOException{
        String line;
        ArrayList<String> fkNames = new ArrayList<String>();
        BufferedReader br = new BufferedReader(new FileReader(StudyApp.currentTopic.getTxtLocation()));
        while ((line = br.readLine()) != null){
            if (line.substring(0, 2).equals("F,")){
                String[] fkData = line.split(",");
                String fkName = fkData[1];
                int qAmount = fkData.length - 2;
                Fragenkatalog currentFK = new Fragenkatalog(fkName, qAmount);
                StudyApp.currentTopic.fKNames.add(currentFK);
                fkNames.add(currentFK.getName());
                String[] lineContent = line.split(",");
                for (int i = 2; i < lineContent.length; i++){
                    currentFK.questions.add(lineContent[i]);
                }
            }
        }
        fkList = FXCollections.observableArrayList(fkNames);
        valueFactory = new SpinnerValueFactory.ListSpinnerValueFactory<>(fkList);


    }

    public void addFKB(){
        startFKB.setVisible(false);
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
        startFKB.setVisible(true);
        addFKB.setVisible(true);
        editFKB.setVisible(true);
        delFKB.setVisible(true);
    }

    public void confirmAdd()throws IOException {
        String topicName = addFKField.getText();
        FileWriter fw = new FileWriter(StudyApp.currentTopic.getTxtLocation(), true);
        fw.write("\n" + "F," + topicName + ",");
        fw.close();
        Fragenkatalog newFK = new Fragenkatalog(topicName);
        StudyApp.currentTopic.fKNames.add(newFK);
        fkList.add(newFK.getName());
        notificationLabel.setText("Fragenkatalog wurde angelegt");
        notificationLabel.setVisible(true);
        setupFK();
        PauseTransition pause = new PauseTransition(Duration.seconds(1));
        pause.setOnFinished(e -> notificationLabel.setText(null));
        pause.play();

        confirmAddB.setVisible(false);
        cancelAddB.setVisible(false);
        addFKField.clear();
        addFKField.setVisible(false);
        startFKB.setVisible(true);
        addFKB.setVisible(true);
        editFKB.setVisible(true);
        delFKB.setVisible(true);
    }

    public void startFK(ActionEvent e)throws IOException{
        FXMLLoader loader = new FXMLLoader(getClass().getResource("fkexe.fxml"));
        root = loader.load();
        FkexeController fkexeController = loader.getController();
        stage = (Stage)((Node)e.getSource()).getScene().getWindow();
        scene = new Scene(root);

        String css = getClass().getResource("Fkexe.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
    }

    public void displayTopic(String topicString){
        header.setText(topicString);
        for(int i = 0; i < StudyApp.currentUser.topics.size(); i++){
            if (topicString.equals(StudyApp.currentUser.topics.get(i).getName())){
                StudyApp.currentTopic = StudyApp.currentUser.topics.get(i);
            }
        }
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        try {
            setupFK();
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (fkList.size() > 0){
            valueFactory.setValue(fkList.get(0));
            StudyApp.currentFk = StudyApp.currentTopic.fKNames.get(0);
        }
        fKSpinner.setValueFactory(valueFactory);
        fKSpinner.valueProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observableValue, String s, String t1) {
                for (int i = 0; i < StudyApp.currentTopic.fKNames.size(); i++){
                    if (StudyApp.currentTopic.fKNames.get(i).getName().equals(fKSpinner.getValue())){
                        StudyApp.currentFk = StudyApp.currentTopic.fKNames.get(i);
                    }
                }
            }
        });

    }




}
