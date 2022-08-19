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
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.io.IOException;
import java.net.URL;
import java.sql.*;
import java.util.ArrayList;
import java.util.ResourceBundle;

public class editController implements Initializable {

    @FXML
    private Spinner qSpinner;
    @FXML
    private MenuButton exitBtn;
    @FXML
    private TextArea qArea;
    @FXML
    private TextField aField1;
    @FXML
    private TextField aField2;
    @FXML
    private TextField aField3;
    @FXML
    private TextField aField4;
    @FXML
    private TextField aField5;
    @FXML
    private Label welcomeLabel;
    @FXML
    private Button editBtn;
    @FXML
    private Button delBtn;
    @FXML
    private Button confirmBtn;
    @FXML
    private Button cancelBtn;
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
    private VBox inputContainer;
    @FXML
    private VBox confirmDeleteContainer;



    private static String CONNECTIONURL = "jdbc:sqlserver://127.0.0.1:1433;databaseName=StudyAppDB;user=Enrico;password=Sneed1;encrypt=true;trustServerCertificate=true;";

    private Stage stage;
    private Scene scene;
    private Parent root;

    private int katID;
    private ArrayList<String> qList = new ArrayList<String>();
    private ObservableList<String> fragen;
    private SpinnerValueFactory<String> valueFactory;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        welcomeLabel.setText(StudyApp.currentKat.getName() + "-Quiz");
        setup();
        if (qList.size() > 0){
            valueFactory.setValue(qList.get(0));
        }
        qSpinner.setValueFactory(valueFactory);
        //currentValue = topicSpinner.getValue();
        qSpinner.valueProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observableValue, String s, String t1) {
                setCurrentQ();
                //änder text des editButtons davon abhängig ob Frage ausgewählt ist oder nicht
                if (qSpinner.getValue().equals("-Frage hinzufügen-")){
                    editBtn.setText("Erstellen");
                    confirmBtn.setText("hinzufügen");
                }else{
                    editBtn.setText("Bearbeiten");
                    confirmBtn.setText("speichern");
                }
            }
        });
    }

    public void setup(){
        //KatalogID ermitteln, Alle zugehörigen Zeilen aus Datenbank in JavaObjekt abspeichern, Spinner befüllen
        try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
            String SQL = "SELECT * from [dbo].[KatalogID]";
            ResultSet rs = stmt.executeQuery(SQL);

            // Iterate through the data in the result set and display it.
            qList.add("-Frage hinzufügen-");
            while (rs.next()) {
                if (rs.getString("Katalog").equals(StudyApp.currentKat.getName())){
                    katID = rs.getInt("KatalogID");
                }
            }
            welcomeLabel.setText(StudyApp.currentKat.getName() + "-Quiz");
            SQL = "Select * from [dbo].[Fragenkatalog]";
            rs = stmt.executeQuery(SQL);
            while(rs.next()){
                qList.add(rs.getString("Frage"));
            }
            fragen = FXCollections.observableArrayList(qList);
            valueFactory = new SpinnerValueFactory.ListSpinnerValueFactory<>(fragen);
            valueFactory.setValue(qList.get(0));
            qSpinner.setValueFactory(valueFactory);
        }
        // Handle any errors that may have occurred.
        catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void setCurrentQ(){
        for (int i = 0; i < qList.size(); i++){
            if (qSpinner.getValue().equals(qList.get(i))){
                StudyApp.currentQ = qList.get(i);
            }
        }
    }

    public void edit(){
        //editBTn wenn keine Frage ausgewählt ist
        if (editBtn.getText().equals("Erstellen")){
            qSpinner.setVisible(false);
            confirmBtn.setVisible(true);
            cancelBtn.setVisible(true);
            editBtn.setVisible(false);
            delBtn.setVisible(false);
            welcomeLabel.setText("Frage erstellen\n(Richtige Antworten bitte ankreuzen)");
            welcomeLabel.setFont(new Font("Lucida Console", 20));
            inputContainer.setVisible(true);
            aField1.setPromptText("Antwort 1");
            aField2.setPromptText("Antwort 2");
            aField3.setPromptText("Antwort 3 (optional)");
            aField4.setPromptText("Antwort 4 (optional)");
            aField5.setPromptText("Antwort 5 (optional)");

        //editBTn wenn Frage ausgewählt ist
        }else{
            inputContainer.setVisible(true);
            confirmBtn.setVisible(true);
            cancelBtn.setVisible(true);
            qSpinner.setVisible(false);
            editBtn.setVisible(false);
            delBtn.setVisible(false);
            try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
                String SQL = "SELECT * from [dbo].[Fragenkatalog] where Frage = ? ";
                PreparedStatement preparedStatement = con.prepareStatement(SQL);
                preparedStatement.setString(1, StudyApp.currentQ);
                ResultSet rs = preparedStatement.executeQuery();
                rs.next();
                qArea.setText(rs.getString("Frage"));
                aField1.setText(rs.getString("Antwort1"));
                aField2.setText(rs.getString("Antwort2"));
                aField3.setText(rs.getString("Antwort3"));
                aField4.setText(rs.getString("Antwort4"));
                aField5.setText(rs.getString("Antwort5"));
                aField1.setPromptText("");
                aField2.setPromptText("");
                aField3.setPromptText("");
                aField4.setPromptText("");
                aField5.setPromptText("");
                String result = rs.getString("Ergebniss");
                if (result.substring(0, 1).equals("w")){
                    aBox1.setSelected(true);
                }
                if (result.substring(1, 2).equals("w")){
                    aBox2.setSelected(true);
                }
                if (result.substring(2, 3).equals("w")){
                    aBox3.setSelected(true);
                }
                if (result.substring(3, 4).equals("w")){
                    aBox4.setSelected(true);
                }
                if (result.substring(4, 5).equals("w")){
                    aBox5.setSelected(true);
                }

            }
            // Handle any errors that may have occurred.
            catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public void addQ(){
        if (confirmBtn.getText().equals("hinzufügen")){
            if (checkQ()){
                try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
                    String sql = "INSERT INTO [dbo].[Fragenkatalog] VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
                    PreparedStatement preparedStatement = con.prepareStatement(sql);

                    preparedStatement.setInt(1, qList.size());
                    preparedStatement.setInt(2, katID);
                    preparedStatement.setString(3, qArea.getText());
                    preparedStatement.setString(4, aField1.getText());
                    preparedStatement.setString(5, aField2.getText());
                    preparedStatement.setString(6, aField3.getText());
                    preparedStatement.setString(7, aField4.getText());
                    preparedStatement.setString(8, aField5.getText());
                    preparedStatement.setString(9, getResult());

                    int rowsAffected = preparedStatement.executeUpdate();
                    if (rowsAffected > 0) {
                    /*inputContainer.setVisible(false);
                    qSpinner.setVisible(true);
                    confirmBtn.setVisible(false);
                    cancelBtn.setVisible(false);
                    editBtn.setVisible(true);
                    delBtn.setVisible(true);*/
                        welcomeLabel.setText("Frage wurde hinzugefügt");
                        qList.add(qArea.getText());
                        fragen = FXCollections.observableArrayList(qList);
                        valueFactory.setValue(qList.get(qList.size()-1));
                        qSpinner.setValueFactory(valueFactory);
                        //errorLabel.setTextFill(Color.web(#));
                        PauseTransition pause = new PauseTransition(Duration.seconds(2));
                        pause.setOnFinished(e ->{
                                    inputContainer.setVisible(false);
                                    qSpinner.setVisible(true);
                                    editBtn.setVisible(true);
                                    delBtn.setVisible(true);
                                    confirmBtn.setVisible(false);
                                    cancelBtn.setVisible(false);
                                    qArea.clear();
                                    aField1.clear();
                                    aField2.clear();
                                    aField3.clear();
                                    aField4.clear();
                                    aField5.clear();
                                }
                        );
                        pause.play();
                    }
                    // Iterate through the data in the result set and display it.
                /*while (rs.next()) {
                    System.out.println(rs.getString("Username") + " " + rs.getString("Password"));
                    errorLabel.setText(rs.getString("Username") + " " + rs.getString("Password"));
                }*/
                }
                // Handle any errors that may have occurred.
                catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }else{
            try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
                String SQL = "Update [dbo].[Fragenkatalog] set Frage = ?, Antwort1 = ?, Antwort2 = ?, Antwort3 = ?, Antwort4 = ?, Antwort5 = ?, Ergebniss = ? where Frage = ?";
                PreparedStatement preparedStatement = con.prepareStatement(SQL);

                preparedStatement.setString(1, qArea.getText());
                preparedStatement.setString(2, aField1.getText());
                preparedStatement.setString(3, aField2.getText());
                preparedStatement.setString(4, aField3.getText());
                preparedStatement.setString(5, aField4.getText());
                preparedStatement.setString(6, aField5.getText());
                preparedStatement.setString(7, createErgebnissUpdate());
                preparedStatement.setString(8, StudyApp.currentQ);
                int rowsAffected = preparedStatement.executeUpdate();
                if (rowsAffected > 0) {
                    welcomeLabel.setText("Änderungen gespeichert");
                    PauseTransition pause = new PauseTransition(Duration.seconds(2));
                    pause.setOnFinished(e ->{
                        welcomeLabel.setText(StudyApp.currentKat.getName() + " - Quiz");
                        inputContainer.setVisible(false);
                        qSpinner.setVisible(true);
                        editBtn.setVisible(true);
                        delBtn.setVisible(true);
                        confirmBtn.setVisible(false);
                        cancelBtn.setVisible(false);
                        qArea.clear();
                        aField1.clear();
                        aField2.clear();
                        aField3.clear();
                        aField4.clear();
                        aField5.clear();
                        }
                    );
                    pause.play();
                }
            }
            // Handle any errors that may have occurred.
            catch (SQLException e) {
                e.printStackTrace();
            }
        }

    }

    public void delete(){
        if (qSpinner.getValue().equals("-Frage hinzufügen-")){
            errorMsg("Erstmal Frage auswählen");
        }else{
            confirmDeleteContainer.setVisible(true);
        }
    }

    public void confirmDelete(){
        try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
            String SQL = "Delete from [dbo].[Fragenkatalog] where Frage = ?";
            PreparedStatement preparedStatement = con.prepareStatement(SQL);

            preparedStatement.setString(1, qSpinner.getValue().toString());
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                welcomeLabel.setText("Frage gelöscht");
                PauseTransition pause = new PauseTransition(Duration.seconds(2));
                pause.setOnFinished(e ->{
                            welcomeLabel.setText(StudyApp.currentKat.getName() + " - Quiz");
                            confirmDeleteContainer.setVisible(false);
                            for (int i = 0; i < qList.size(); i++){
                                if (qSpinner.getValue().toString().equals(qList.get(i))){
                                    qList.remove(i);
                                    fragen = FXCollections.observableArrayList(qList);
                                    valueFactory.setValue(qList.get(qList.size()-1));
                                    qSpinner.setValueFactory(valueFactory);
                                }
                            }
                        }
                );
                pause.play();
            }
        }
        // Handle any errors that may have occurred.
        catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public String getResult(){
        //built resultString for [dbo].[Fragenkatalog]
        String result = "";
        if (aBox1.isSelected()){
            result += "w";
        }else{
            result += "f";
        }
        if (aBox2.isSelected()){
            result += "w";
        }else{
            result += "f";
        }
        if (aBox3.isSelected()){
            result += "w";
        }else{
            result += "f";
        }
        if (aBox4.isSelected()){
            result += "w";
        }else{
            result += "f";
        }
        if (aBox5.isSelected()){
            result += "w";
        }else{
            result += "f";
        }
        return result;
    }

    public boolean checkQ(){
        //check for errors in userinput and display errormessages if necessary
        boolean a = true;
        //check for empty question or answer fields
        if (qArea.getText().equals("") || aField1.getText().equals("")||aField2.getText().equals("")){
            a = false;
            errorMsg("Eingaben ohne Frage oder\nAntwort 1 und 2 sind unzulässig");
            return a;
        }
        //check for zero correct answers
        if (!aBox1.isSelected() && !aBox2.isSelected() && !aBox3.isSelected() && !aBox4.isSelected() && !aBox5.isSelected()){
            a = false;
            errorMsg("mindestens eine der Antworten\nmuss korrekt sein");
            return a;
        }
        if (!aBox1.isSelected() && !aBox2.isSelected()){
            if (aBox3.isSelected() && aField3.getText().equals("")){
                a = false;
                errorMsg("Leere Antworten können\nnicht korrekt sein");
                return a;
            }
            if (aBox4.isSelected() && aField4.getText().equals("")){
                a = false;
                errorMsg("Leere Antworten können\nnicht korrekt sein");
                return a;
            }
            if (aBox4.isSelected() && aField4.getText().equals("")){
                a = false;
                errorMsg("Leere Antworten können\nnicht korrekt sein");
                return a;
            }

        }
        return a;
    }

    public void errorMsg(String error){
        welcomeLabel.setText(error);
        PauseTransition pause = new PauseTransition(Duration.seconds(2));
        pause.setOnFinished(e ->{
                    welcomeLabel.setText("Frage erstellen\n(Richtige Antworten bitte ankreuzen)");
                }
        );
        pause.play();
    }

    public String createErgebnissUpdate(){
        String ergebniss = "fffff";
        try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
            String SQL = "SELECT * FROM [dbo].[Fragenkatalog] where Frage = ?";
            PreparedStatement preparedStatement = con.prepareStatement(SQL);
            preparedStatement.setString(1, StudyApp.currentQ);
            ResultSet rs = preparedStatement.executeQuery();
            rs.next();
            StringBuffer buffer = new StringBuffer(rs.getString("Ergebniss"));
            if (aBox1.isSelected()){
                buffer.replace(0, 1, "w");
            }else{
                buffer.replace(0, 1, "f");
            }
            if (aBox2.isSelected()){
                buffer.replace(1, 2, "w");
            }else{
                buffer.replace(1, 2, "f");
            }
            if (aBox3.isSelected()){
                buffer.replace(2, 3, "w");
            }else{
                buffer.replace(2, 3, "f");
            }
            if (aBox4.isSelected()){
                buffer.replace(3, 4, "w");
            }else{
                buffer.replace(3, 4, "f");
            }
            if (aBox5.isSelected()){
                buffer.replace(4, 5, "w");
            }else{
                buffer.replace(4, 5, "f");
            }
            ergebniss = buffer.toString();
            return ergebniss;
        }
        // Handle any errors that may have occurred.
        catch (SQLException e) {
            e.printStackTrace();
        }
        return ergebniss;
    }

    public void cancel(ActionEvent event)throws IOException {
        StudyApp.currentQ = null;
        FXMLLoader loader = new FXMLLoader(getClass().getResource("editScreen.fxml"));
        root = loader.load();
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        scene = new Scene(root);

        String css = getClass().getResource("Style.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
    }

    //MenueBTn Methods
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
        stage = (Stage) welcomeLabel.getScene().getWindow();
        stage.close();
    }
}
