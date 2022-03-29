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

import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;
import java.util.Scanner;

public class FScreenController implements Initializable {

    @FXML
    public Label header;
    @FXML
    public Label fKLabel;
    @FXML
    public Label errorLabel;
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
    public Button addQB;
    @FXML
    public Button confirmAddQB;
    @FXML
    public Button cancelAddQB;
    @FXML
    public Button editQB;
    @FXML
    public Button delQB;
    @FXML
    public Spinner<String> fKSpinner;
    @FXML
    public TextField addFKField;
    @FXML
    public TextField aField1;
    @FXML
    public TextField aField2;
    @FXML
    public TextField aField3;
    @FXML
    public TextField aField4;
    @FXML
    public TextField aField5;
    @FXML
    public CheckBox a1cb;
    @FXML
    public CheckBox a2cb;
    @FXML
    public CheckBox a3cb;
    @FXML
    public CheckBox a4cb;
    @FXML
    public CheckBox a5cb;

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
        fKSpinner.setVisible(false);
        startFKB.setVisible(false);
        editFKB.setVisible(false);
        delFKB.setVisible(false);
        addFKB.setVisible(false);
        confirmAddB.setVisible(true);
        addFKField.setVisible(true);
        cancelAddB.setVisible(true);
    }

    public void cancelAdd(ActionEvent e)throws IOException{
        header.setText("Wilkommen");
        fKLabel.setText("Fragenkatalog: ");
        errorLabel.setVisible(false);
        fKSpinner.setVisible(true);
        aField1.setVisible(false);
        aField2.setVisible(false);
        aField3.setVisible(false);
        aField4.setVisible(false);
        aField5.setVisible(false);
        a1cb.setVisible(false);
        a2cb.setVisible(false);
        a3cb.setVisible(false);
        a4cb.setVisible(false);
        a5cb.setVisible(false);
        addQB.setVisible(false);
        editQB.setVisible(false);
        delQB.setVisible(false);
        confirmAddQB.setVisible(false);
        cancelAddQB.setVisible(false);
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

    public void editFK(){
        header.setText("Fragenkatalog: " + StudyApp.currentFk.getName());
        fKLabel.setText("möchten Sie eine Frage...");
        fKSpinner.setVisible(false);
        addQB.setVisible(true);
        editQB.setVisible(true);
        delQB.setVisible(true);
        cancelAddB.setVisible(true);
        addFKB.setVisible(false);
        startFKB.setVisible(false);
        editFKB.setVisible(false);
        delFKB.setVisible(false);
    }

    public void addQ(){
        aField1.setVisible(true);
        aField2.setVisible(true);
        aField3.setVisible(true);
        aField4.setVisible(true);
        aField5.setVisible(true);
        a1cb.setVisible(true);
        a2cb.setVisible(true);
        a3cb.setVisible(true);
        a4cb.setVisible(true);
        a5cb.setVisible(true);
        fKSpinner.setVisible(false);
        editQB.setVisible(false);
        addQB.setVisible(false);
        delQB.setVisible(false);
        cancelAddB.setVisible(false);
        confirmAddQB.setVisible(true);
        cancelAddQB.setVisible(true);
        fKLabel.setText("Bitte neue Frage mit 3-5 Antworten eingeben(Bitte denken sie daran, dass mindestens eine der Antworten richtig sein muss): ");
        addFKField.setVisible(true);
    }

    public void enterQ()throws IOException{
        if (checkEntry()){
            saveQ();
            errorLabel.setVisible(false);
            header.setText("nice");

        }else{
            errorLabel.setVisible(true);
            aField1.clear();
            aField2.clear();
            aField3.clear();
            aField4.clear();
            aField5.clear();
            a1cb.setSelected(false);
            a2cb.setSelected(false);
            a3cb.setSelected(false);
            a4cb.setSelected(false);
            a5cb.setSelected(false);
        }
    }
    public boolean checkEntry(){
        int aCounter = 0;
        int trueCounter = 0;
        if (!aField1.getText().equals("")){
            aCounter++;
            if (a1cb.isSelected()){
                trueCounter++;
            }
        }
        if (!aField2.getText().equals("")){
            aCounter++;
            if (a2cb.isSelected()){
                trueCounter++;
            }
        }
        if (!aField3.getText().equals("")){
            aCounter++;
            if (a3cb.isSelected()){
                trueCounter++;
            }
        }
        if (!aField4.getText().equals("")){
            aCounter++;
            if (a4cb.isSelected()){
                trueCounter++;
            }
        }
        if (!aField5.getText().equals("")){
            aCounter++;
            if (a5cb.isSelected()){
                trueCounter++;
            }
        }
        if (aCounter > 2 && trueCounter > 0){
            if (addFKField.getText().equals("")){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
    }

    public void saveQ()throws IOException {
        ArrayList<String> txtData = new ArrayList<String>();
        File file = new File(StudyApp.currentTopic.getTxtLocation());
        Scanner scanner = new Scanner(file);
        while(scanner.hasNextLine()){
            txtData.add(scanner.nextLine());
        }
        scanner.close();
        String enteredString = "," + addFKField.getText();
        if (!aField1.equals("")){
            if (a1cb.isSelected()){
                enteredString += aField1.getText() + "(w)";
            }else{
                enteredString += aField1.getText() + "(f)";
            }
        }
        if (!aField2.equals("")){
            if (a2cb.isSelected()){
                enteredString += aField2.getText() + "(w)";
            }else{
                enteredString += aField2.getText() + "(f)";
            }
        }
        if (!aField3.equals("")){
            if (a3cb.isSelected()){
                enteredString += aField3.getText() + "(w)";
            }else{
                enteredString += aField3.getText() + "(f)";
            }
        }
        if (!aField4.equals("")){
            if (a4cb.isSelected()){
                enteredString += aField4.getText() + "(w)";
            }else{
                enteredString += aField4.getText() + "(f)";
            }
        }
        if (!aField5.equals("")){
            if (a5cb.isSelected()){
                enteredString += aField5.getText() + "(w)";
            }else{
                enteredString += aField5.getText() + "(f)";
            }
        }
        for(int i = 0; i < txtData.size(); i++){
            if (txtData.get(i).contains("," + StudyApp.currentFk.getName())){
                enteredString = txtData.get(i) + enteredString;
                txtData.set(i, enteredString);
            }
        }
        PrintWriter pw = new PrintWriter(StudyApp.currentTopic.getTxtLocation());
        for (int i = 0; i < txtData.size(); i++){
            pw.write(txtData.get(i));
            if (i +1 <= txtData.size()){
                pw.write("\n");
            }
        }
        pw.close();

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
