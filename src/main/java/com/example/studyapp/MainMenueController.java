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

import java.io.IOException;
import java.net.URL;
import java.sql.*;
import java.util.ArrayList;
import java.util.ResourceBundle;

public class MainMenueController implements Initializable{

    @FXML
    private Spinner katSpinner;
    @FXML
    private TextArea katField;
    @FXML
    private Label welcomeLabel;
    @FXML
    private MenuButton exitBtn;
    @FXML
    private Button startBtn;
    @FXML
    private Button editBtn;
    @FXML
    private Button statsBtn;
    @FXML
    private Button confirmBtn;
    @FXML
    private Button cancelBtn;

    private static String CONNECTIONURL = "jdbc:sqlserver://127.0.0.1:1433;databaseName=StudyAppDB;user=Enrico;password=Sneed1;encrypt=true;trustServerCertificate=true;";

    private Stage stage;
    private Scene scene;
    private Parent root;

    private ArrayList<String> katList = new ArrayList<String>();
    private ObservableList<String> katalogs;
    private SpinnerValueFactory<String> valueFactory;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        setup();
        if (katList.size() > 0){
            valueFactory.setValue(katList.get(0));
        }
        katSpinner.setValueFactory(valueFactory);
        welcomeLabel.setText("Welcome " + StudyApp.currentUser.getuName());
        //currentValue = topicSpinner.getValue();
        katSpinner.valueProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observableValue, String s, String t1) {
                //currentValue = topicSpinner.getValue();
                setKatalog();
            }
        });
    }

    public void setup(){
        //Array erstellen und mit Katalognamen aus der Datenbank füllen
        try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
            String SQL = "SELECT * from [dbo].[KatalogID]";
            ResultSet rs = stmt.executeQuery(SQL);

            // Iterate through the data in the result set and display it.
            katList.add("-Neuen Katalog erstellen-");
            while (rs.next()) {
                katList.add(rs.getString("Katalog"));
            }
            katalogs = FXCollections.observableArrayList(katList);
            valueFactory = new SpinnerValueFactory.ListSpinnerValueFactory<>(katalogs);
            valueFactory.setValue(katList.get(0));
            katSpinner.setValueFactory(valueFactory);
        }
        // Handle any errors that may have occurred.
        catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void setKatalog(){
        for (int i = 0; i < katList.size(); i++){
            if (katSpinner.getValue().equals(katList.get(i))){
                StudyApp.currentKat = new Katalog(katList.get(i));
            }
        }
    }

    public void start(ActionEvent event)throws IOException{
        if (katSpinner.getValue().equals("-Neuen Katalog erstellen-")){
            //neuen Katalog anlegen
            newKatSetup();
        }else{
            //Quiz starten
            FXMLLoader loader = new FXMLLoader(getClass().getResource("quiz.fxml"));
            root = loader.load();
            stage = (Stage)((Node)event.getSource()).getScene().getWindow();
            scene = new Scene(root);

            String css = getClass().getResource("Style.css").toExternalForm();
            scene.getStylesheets().add(css);
            stage.setScene(scene);
            stage.show();
        }
    }

    public void newKatSetup(){
        welcomeLabel.setText("Name des Katalogs?");
        katSpinner.setVisible(false);
        katField.setVisible(true);
        startBtn.setVisible(false);
        editBtn.setVisible(false);
        statsBtn.setVisible(false);
        confirmBtn.setVisible(true);
        cancelBtn.setVisible(true);

    }

    public void addNewKat() {
        //check katField input with Database and add new entry if possible
        for (int i = 0; i < katList.size(); i++) {
            if (katList.get(i).equals(katField.getText())) {
                welcomeLabel.setText("Katalogname bereits vergeben");
                PauseTransition pause = new PauseTransition(Duration.seconds(2));
                pause.setOnFinished(e ->
                        welcomeLabel.setText("Willkommen " + StudyApp.currentUser.getuName())
                );
                pause.play();
                return;
            }
        }
        try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
            String sql = "INSERT INTO [dbo].[KatalogID] VALUES (?);";
            PreparedStatement preparedStatement = con.prepareStatement(sql);

            preparedStatement.setString(1, katField.getText());

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                welcomeLabel.setText("Katalog wurde angelegt");
                katList.add(katField.getText());
                katalogs.add(katField.getText());
                //errorLabel.setTextFill(Color.web(#));
                PauseTransition pause = new PauseTransition(Duration.seconds(2));
                pause.setOnFinished(e ->{
                    welcomeLabel.setText("Willkommen " + StudyApp.currentUser.getuName());
                    cancel();
                        }
                );
                pause.play();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void edit(ActionEvent event)throws IOException{
        if (katSpinner.getValue().equals("-Neuen Katalog erstellen-")){
            welcomeLabel.setText("erstmal Katalog auswählen");
            PauseTransition pause = new PauseTransition(Duration.seconds(2));
            pause.setOnFinished(e ->{
                        welcomeLabel.setText("Willkommen " + StudyApp.currentUser.getuName());
                        cancel();
                    }
            );
            pause.play();
        }else{
            FXMLLoader loader = new FXMLLoader(getClass().getResource("editScreen.fxml"));
            root = loader.load();
            stage = (Stage)((Node)event.getSource()).getScene().getWindow();
            scene = new Scene(root);

            String css = getClass().getResource("Style.css").toExternalForm();
            scene.getStylesheets().add(css);
            stage.setScene(scene);
            stage.show();
        }
    }

    public void cancel(){
        welcomeLabel.setText("Willkommen " + StudyApp.currentUser.getuName());
        welcomeLabel.setVisible(true);
        katSpinner.setVisible(true);
        startBtn.setVisible(true);
        editBtn.setVisible(true);
        statsBtn.setVisible(true);
        katField.setVisible(false);
        katField.setText("");
        confirmBtn.setVisible(false);
        cancelBtn.setVisible(false);
    }
    //MenueBtn Methods
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
        stage = (Stage) welcomeLabel.getScene().getWindow();
        stage.close();
    }



}
