package com.example.studyapp;

import javafx.animation.PauseTransition;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.io.IOException;
import java.net.URL;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;
import java.util.ResourceBundle;
import java.util.concurrent.ThreadLocalRandom;

public class QuizController implements Initializable {
    @FXML
    private VBox quizContainer;
    @FXML
    private VBox resultContainer;
    @FXML
    private HBox aContainer1;
    @FXML
    private HBox aContainer2;
    @FXML
    private HBox aContainer3;
    @FXML
    private HBox aContainer4;
    @FXML
    private HBox aContainer5;
    @FXML
    public Label welcomeLabel;
    @FXML
    private Label resultLabel;
    @FXML
    private Label qLabel;
    @FXML
    private Label aLabel1;
    @FXML
    private Label aLabel2;
    @FXML
    private Label aLabel3;
    @FXML
    private Label aLabel4;
    @FXML
    private Label aLabel5;
    @FXML
    private Label progressLabel;
    @FXML
    private CheckBox aBox1;
    @FXML
    private CheckBox aBox2;
    @FXML
    private CheckBox aBox3;
    @FXML
    private CheckBox aBox4;
    @FXML
    private CheckBox aBox5;
    @FXML
    private Button continueBtn;

    private Stage stage;
    private Scene scene;
    private Parent root;

    private ArrayList<String> questions = new ArrayList<String>();
    private ArrayList<String> a1 = new ArrayList<String>();
    private ArrayList<String> a2 = new ArrayList<String>();
    private ArrayList<String> a3 = new ArrayList<String>();
    private ArrayList<String> a4 = new ArrayList<String>();
    private ArrayList<String> a5 = new ArrayList<String>();
    private ArrayList<String> results = new ArrayList<String>();
    private int[] sequence;
    private String result;
    private Katalog kat;
    private int position = 0;
    private int correctAs = 0;
    private int currentScore = 0;


    private static String CONNECTIONURL = "jdbc:sqlserver://127.0.0.1:1433;databaseName=StudyAppDB;user=Enrico;password=Sneed1;encrypt=true;trustServerCertificate=true;";


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        setupQuiz();
    }
    public void setupQuiz(){
        welcomeLabel.setWrapText(true);
        createKat();
        sequence = new int[kat.getSize()];
        sequence = shuffle(sequence);
        displayQ(position);
    }

    public void createKat(){
        try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
            String SQL = "SELECT * FROM [dbo].[KatalogID] where Katalog = ?";
            PreparedStatement preparedStatement = con.prepareStatement(SQL);
            preparedStatement.setString(1, StudyApp.currentKat.getName());
            ResultSet rs = preparedStatement.executeQuery();
            rs.next();
            int katID = rs.getInt("KatalogID");
            SQL = "Select * from [dbo].[Fragenkatalog] where KatalogID = ?";
            preparedStatement = con.prepareStatement(SQL);
            preparedStatement.setInt(1, katID);
            rs = preparedStatement.executeQuery();
            while(rs.next()){
                questions.add(rs.getString("Frage"));
                a1.add(rs.getString("Antwort1"));
                a2.add(rs.getString("Antwort2"));
                a3.add(rs.getString("Antwort3"));
                a4.add(rs.getString("Antwort4"));
                a5.add(rs.getString("Antwort5"));
                results.add(rs.getString("Ergebniss"));
            }
            kat = new Katalog(StudyApp.currentKat.getName(), katID, questions, a1, a2, a3, a4, a5, results);
            welcomeLabel.setText(kat.getName() + " - Quiz");
        }
        // Handle any errors that may have occurred.
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void displayQ(int position){
        //set question and answer
        qLabel.setText(kat.questions.get(sequence[position] -1));
        aLabel1.setTextFill(Color.web("#BCD1AC"));
        aLabel2.setTextFill(Color.web("#BCD1AC"));
        aLabel3.setTextFill(Color.web("#BCD1AC"));
        aLabel4.setTextFill(Color.web("#BCD1AC"));
        aLabel5.setTextFill(Color.web("#BCD1AC"));
        aBox1.setSelected(false);
        aBox2.setSelected(false);
        aBox3.setSelected(false);
        aBox4.setSelected(false);
        aBox5.setSelected(false);
        displayA(position);
        displayProgress();
    }

    public void displayA(int position) {
        String[] qOrder = {kat.a1.get(sequence[position]-1), kat.a2.get(sequence[position]-1), kat.a3.get(sequence[position]-1), kat.a4.get(sequence[position]-1), kat.a5.get(sequence[position]-1)};
        qOrder = doubleShuffle(qOrder, kat.results.get(sequence[position] -1));
        qOrder = doubleShorting(qOrder, result);
        aLabel1.setText(qOrder[0]);
        aLabel2.setText(qOrder[1]);
        aLabel3.setText(qOrder[2]);
        aLabel4.setText(qOrder[3]);
        aLabel5.setText(qOrder[4]);
        aLabel3.setVisible(true);
        aBox3.setVisible(true);
        aLabel4.setVisible(true);
        aBox4.setVisible(true);
        aLabel5.setVisible(true);
        aBox5.setVisible(true);
        if (aLabel3.getText().equals("")){
            aLabel3.setVisible(false);
            aBox3.setVisible(false);
        }
        if (aLabel4.getText().equals("")){
            aLabel4.setVisible(false);
            aBox4.setVisible(false);
        }
        if (aLabel5.getText().equals("")){
            aLabel5.setVisible(false);
            aBox5.setVisible(false);
        }
    }

    public void weiter(){
        if(!aBox1.isSelected() && !aBox2.isSelected() && !aBox3.isSelected() && !aBox4.isSelected() && !aBox5.isSelected()){
            welcomeLabel.setText("Mindestens eine der Antworten ist richtig");
            PauseTransition pause = new PauseTransition(Duration.seconds(2));
            pause.setOnFinished(e ->
                    welcomeLabel.setText(kat.getName() + " - Quiz")
            );
            pause.play();
        }else{
            displayCorrection();
        }

    }

    public void displayCorrection(){
        if ((result.substring(0, 1).equals("w") && aBox1.isSelected())||(result.substring(0, 1).equals("f"))&& !aBox1.isSelected()){
            aLabel1.setTextFill(Color.web("#59C722"));
            currentScore++;
        }else{
            aLabel1.setTextFill(Color.web("#C7450E"));
        }
        if ((result.substring(1, 2).equals("w") && aBox2.isSelected())||(result.substring(1, 2).equals("f"))&& !aBox2.isSelected()){
            aLabel2.setTextFill(Color.web("#59C722"));
            currentScore++;
        }else{
            aLabel2.setTextFill(Color.web("#C7450E"));
        }
        if (aBox3.isVisible()){
            if ((result.substring(2, 3).equals("w") && aBox3.isSelected())||(result.substring(2, 3).equals("f"))&& !aBox3.isSelected()){
                aLabel3.setTextFill(Color.web("#59C722"));
                currentScore++;
            }else{
                aLabel3.setTextFill(Color.web("#C7450E"));
            }
        }
        if (aBox4.isVisible()){
            if ((result.substring(3, 4).equals("w") && aBox4.isSelected())||(result.substring(3, 4).equals("f"))&& !aBox4.isSelected()){
                aLabel4.setTextFill(Color.web("#59C722"));
                currentScore++;
            }else{
                aLabel4.setTextFill(Color.web("#C7450E"));
            }
        }
        if (aBox5.isVisible()){
            if ((result.substring(4, 5).equals("w") && aBox5.isSelected())||(result.substring(4, 5).equals("f"))&& !aBox5.isSelected()){
                aLabel5.setTextFill(Color.web("#59C722"));
                currentScore++;
            }else{
                aLabel5.setTextFill(Color.web("#C7450E"));
            }
        }
        PauseTransition pause = new PauseTransition(Duration.seconds(1));
        pause.setOnFinished(e ->{
            position++;
            if (position == sequence.length){
                continueBtn.setText("auswerten");
            }
            if (continueBtn.getText().equals("weiter")) {
                displayQ(position);
            }else{
                quizContainer.setVisible(false);
                resultContainer.setVisible(true);
                resultLabel.setText("Sie haben \n" + currentScore + " von " + getMaxScore() + "\nPunkten erreicht");
                progressLabel.setVisible(false);
            }

        }
        );
        pause.play();

    }

    public void displayProgress(){
        progressLabel.setText(position+1 + "/" + kat.questions.size());
    }

    public int getMaxScore(){
        int maxScore = 0;
        for(int i = 0; i < kat.a1.size(); i++){
            if (!kat.a1.get(i).equals("")){
                maxScore++;
            }
        }
        for(int i = 0; i < kat.a2.size(); i++){
            if (!kat.a2.get(i).equals("")){
                maxScore++;
            }
        }
        for(int i = 0; i < kat.a3.size(); i++){
            if (!kat.a3.get(i).equals("")){
                maxScore++;
            }
        }
        for(int i = 0; i < kat.a4.size(); i++){
            if (!kat.a4.get(i).equals("")){
                maxScore++;
            }
        }
        for(int i = 0; i < kat.a5.size(); i++){
            if (!kat.a5.get(i).equals("")){
                maxScore++;
            }
        }
        return maxScore;
    }


    public boolean contains(int[] ergebniss, int number){
        for (int i = 0; i < ergebniss.length; i++){
            if (ergebniss[i] == number){
                return true;
            }
        }
        return false;
    }

    public int[] shuffle(int[] a){
        int max = a.length;
        int r = (int)(Math.random()*(max - 1 + 1) + 1);
        for (int i = 0; i < max; i++){
            while(contains(a, r)){
                r = (int)(Math.random()*(max - 1 + 1)+ 1);
            }
            a[i] = r;
        }
        return a;
    }

    public int[] shuffleArray(int[] ar){
        Random rnd = ThreadLocalRandom.current();
        for (int i = ar.length - 1; i > 0; i--){
            int index = rnd.nextInt(i+1);
            int a = ar[index];
            ar[index] = ar[i];
            ar[i] = a;
        }
        return ar;
    }

    public String[] doubleShuffle(String[] ar, String str){
        Random rnd = ThreadLocalRandom.current();
        StringBuffer sb = new StringBuffer(str);
        for (int i = ar.length - 1; i > 0; i--){
            int index = rnd.nextInt(i+1);
            String a = ar[index];
            String b = sb.toString().substring(index, index + 1);
            ar[index] = ar[i];
            ar[i] = a;
            sb.replace(index, index + 1, sb.toString().substring(i, i+1));
            sb.replace(i, i + 1, b);
        }
        result = sb.toString();
        return ar;
    }

    public String[] doubleShorting(String[] ar, String str){
        StringBuffer sb = new StringBuffer(str);
        String a;
        String b;
        for (int i = 0; i < ar.length - 1; i++){
            if (ar[i].equals("")){
                for (int j = i + 1; j < ar.length; j++){
                    if (!ar[j].equals("")){
                        //detect if there is an empty aLabel and swap places in answerArray and resultString accordingly
                        a = ar[j];
                        ar[j] = ar[i];
                        ar[i] = a;
                        b = sb.toString().substring(j, j+1);
                        sb.replace(j, j+1, sb.toString().substring(i, i+1));
                        sb.replace(i, i+1, b);
                    }
                }
            }
        }
        result = sb.toString();
        return ar;
    }

    //MenueBtn methods
    public void back2StartingPage(ActionEvent event)throws IOException {
        StudyApp.currentKat = null;
        FXMLLoader loader = new FXMLLoader(getClass().getResource("mainMenue.fxml"));
        root = loader.load();
        MainMenueController mainMenueController = loader.getController();
        stage = (Stage)welcomeLabel.getScene().getWindow();
        scene = new Scene(root);

        String css = getClass().getResource("Style.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
    }

    public void logout(ActionEvent event)throws IOException {
        StudyApp.currentKat = null;
        StudyApp.currentUser = null;
        FXMLLoader loader = new FXMLLoader(getClass().getResource("login.fxml"));
        root = loader.load();
        stage = (Stage)welcomeLabel.getScene().getWindow();
        scene = new Scene(root);

        String css = getClass().getResource("Style.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
    }

    public void exitApp(){
        stage = (Stage) progressLabel.getScene().getWindow();
        stage.close();
    }

}
