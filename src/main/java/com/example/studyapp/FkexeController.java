package com.example.studyapp;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.paint.Color;

import java.util.ArrayList;
import java.util.Random;

public class FkexeController {

    @FXML
    public Label header;
    @FXML
    public Label qLabel;
    @FXML
    public Label a1Label;
    @FXML
    public Label a2Label;
    @FXML
    public Label a3Label;
    @FXML
    public Label a4Label;
    @FXML
    public Label a5Label;
    @FXML
    public Button startQuizB;
    @FXML
    public Button cancelQuizB;
    @FXML
    public Button submitB;
    @FXML
    public Button nextB;
    @FXML
    public CheckBox a1CB;
    @FXML
    public CheckBox a2CB;
    @FXML
    public CheckBox a3CB;
    @FXML
    public CheckBox a4CB;
    @FXML
    public CheckBox a5CB;

    public ArrayList<String> questions = new ArrayList<String>();
    public String[] answers;
    public String currentQ;
    public String a1;
    public String a2;
    public String a3;
    public String a4;
    public String a5;
    public int qNumber = 0;
    public int fCounter = 0;
    public Random rd = new Random();



    public void startQuiz(){
        a1CB.setVisible(true);
        a2CB.setVisible(true);
        startQuizB.setVisible(false);
        submitB.setVisible(true);
        cancelQuizB.setVisible(true);
        header.setText(StudyApp.currentFk.getName() + " Quiz: 0/" + StudyApp.currentFk.qAmount);
        setupQuiz();
    }

    public void setupQuiz(){
        for (int i = 0; i < StudyApp.currentFk.questions.size(); i++){
            questions.add(StudyApp.currentFk.questions.get(i));
        }
        if (StudyApp.currentFk != null){
            currentQ = nextQ();
            qNumber++;
            header.setText(StudyApp.currentFk.getName() + " Quiz: "+ qNumber + "/" + StudyApp.currentFk.qAmount);
            displayQ(currentQ);
        }

    }

    public String nextQ(){
        int next = (int)rd.nextInt(questions.size());
        String q = questions.get(next);
        questions.remove(next);
        return q;
    }

    public void displayQ(String full){
        a3CB.setVisible(false);
        a4CB.setVisible(false);
        a5CB.setVisible(false);
        a1CB.setSelected(false);
        a2CB.setSelected(false);
        a3CB.setSelected(false);
        a4CB.setSelected(false);
        a5CB.setSelected(false);
        a1Label.setText("");
        a2Label.setText("");
        a3Label.setText("");
        a4Label.setText("");
        a5Label.setText("");
        int qLength = full.indexOf("?");
        String aString = full.substring(qLength + 1);
        answers = aString.split("\\)");
        qLabel.setText(full.substring(0, qLength + 1));
        a1Label.setText(answers[0].replace("(w", "").replace("(f", ""));
        a2Label.setText(answers[1].replace("(w", "").replace("(f", ""));
        if (answers.length > 2) {
            a3Label.setText(answers[2].replace("(w", "").replace("(f", ""));
            a3CB.setVisible(true);
        }
        if (answers.length > 3) {
            a4Label.setText(answers[3].replace("(w", "").replace("(f", ""));
            a4CB.setVisible(true);
        }
        if (answers.length > 4){
            a5Label.setText(answers[4].replace("(w", "").replace("(f", ""));
            a5CB.setVisible(true);
        }

    }

    public void submitA(){
        submitB.setVisible(false);
        nextB.setVisible(true);
    //check 1
        if (answers[0].contains("(w") && a1CB.isSelected()){
            a1Label.setTextFill(Color.web("#03fc30"));
        }else if (answers[0].contains("(f") && !a1CB.isSelected()){
            a1Label.setTextFill(Color.web("#03fc30"));
        }else{
            a1Label.setTextFill(Color.web("#ea0a8e"));
            fCounter++;
        }
    //check 2
        if (answers[1].contains("(w") && a2CB.isSelected()){
            a2Label.setTextFill(Color.web("#03fc30"));
        }else if (answers[1].contains("(f") && !a1CB.isSelected()){
            a2Label.setTextFill(Color.web("#03fc30"));
        }else{
            a2Label.setTextFill(Color.web("#ea0a8e"));
            fCounter++;
        }
    //check 3
        if (answers.length > 2){
            if (answers[2].contains("(w") && a3CB.isSelected()){
                a3Label.setTextFill(Color.web("#03fc30"));
            }else if (answers[2].contains("(f") && !a1CB.isSelected()){
                a3Label.setTextFill(Color.web("#03fc30"));
            }else{
                a3Label.setTextFill(Color.web("#ea0a8e"));
                fCounter++;
            }
        }
    //check 4
        if (answers.length > 3){
            if (answers[3].contains("(w") && a4CB.isSelected()){
                a4Label.setTextFill(Color.web("#03fc30"));
            }else if (answers[3].contains("(f") && !a1CB.isSelected()){
                a4Label.setTextFill(Color.web("#03fc30"));
            }else{
                a4Label.setTextFill(Color.web("#ea0a8e"));
                fCounter++;
            }
        }
    //check 5
        if (answers.length > 4){
            if (answers[4].contains("(w") && a5CB.isSelected()){
                a5Label.setTextFill(Color.web("#03fc30"));
            }else if (answers[4].contains("(f") && !a1CB.isSelected()){
                a5Label.setTextFill(Color.web("#03fc30"));
            }else{
                a5Label.setTextFill(Color.web("#ea0a8e"));
                fCounter++;
            }
        }

    }

    public void next(){
        nextB.setVisible(false);
        submitB.setVisible(true);
        a1Label.setTextFill(Color.web("#888888"));
        a2Label.setTextFill(Color.web("#888888"));
        a3Label.setTextFill(Color.web("#888888"));
        a4Label.setTextFill(Color.web("#888888"));
        a5Label.setTextFill(Color.web("#888888"));
        currentQ = nextQ();
        qNumber++;
        header.setText(StudyApp.currentFk.getName() + " Quiz: "+ qNumber + "/" + StudyApp.currentFk.qAmount);
        displayQ(currentQ);
    }
}
