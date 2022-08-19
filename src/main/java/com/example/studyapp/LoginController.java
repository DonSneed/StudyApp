package com.example.studyapp;

import javafx.animation.PauseTransition;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.io.IOException;
import java.sql.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;


public class LoginController {
    @FXML
    private Label errorLabel;
    @FXML
    private Label rePWLabel;
    @FXML
    private TextField userField;
    @FXML
    private TextField pwField;
    @FXML
    private TextField pwField2;
    @FXML
    private Button loginButton;
    @FXML
    private Button regButton;

    private Stage stage;
    private Scene scene;
    private Parent root;

    private static String CONNECTIONURL = "jdbc:sqlserver://127.0.0.1:1433;databaseName=StudyAppDB;user=Enrico;password=Sneed1;encrypt=true;trustServerCertificate=true;";

    @FXML
    private void register(ActionEvent event)throws IOException {
        if (pwField2.getText().equals("")){
            pwField2.setVisible(true);
            rePWLabel.setVisible(true);
            rePWLabel.setText("Passwort\nWiederholen:");

        }else{
            if (checkNewUser()){
                try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
                    String sql = "INSERT INTO [dbo].[User] VALUES (?, ?);";
                    PreparedStatement preparedStatement = con.prepareStatement(sql);

                    preparedStatement.setString(1, userField.getText());
                    preparedStatement.setString(2, pwField.getText());

                    int rowsAffected = preparedStatement.executeUpdate();
                    if (rowsAffected > 0){
                        errorLabel.setText("Benutzer wurde angelegt");
                        //errorLabel.setTextFill(Color.web(#));
                        PauseTransition pause = new PauseTransition(Duration.seconds(2));
                        pause.setOnFinished(e ->
                                errorLabel.setText(null)
                        );
                        pause.play();
                    }
                    userField.setText("");
                    pwField.setText("");
                    pwField2.setText("");
                    pwField2.setVisible(false);
                    rePWLabel.setVisible(false);
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
            }else{
                userField.setText("");
                pwField.setText("");
                pwField2.setText("");
            }
        }
    }

    public boolean checkNewUser(){
        boolean a = false;
        try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
            String SQL = "SELECT * FROM [dbo].[User]";
            ResultSet rs = stmt.executeQuery(SQL);

            // Iterate through the data in the result set and display it.
            while (rs.next()) {
                if (rs.getString("Username").equals(userField.getText())){
                    errorLabel.setText("Username bereits bereits vergeben");
                    PauseTransition pause = new PauseTransition(Duration.seconds(2));
                    pause.setOnFinished(e ->
                            errorLabel.setText(null)
                    );
                    pause.play();
                    return a;
                }else if (!pwField.getText().equals(pwField2.getText())){
                    errorLabel.setText("Passwörter müssen übereinstimmen");
                    PauseTransition pause = new PauseTransition(Duration.seconds(2));
                    pause.setOnFinished(e ->
                            errorLabel.setText(null)
                    );
                    pause.play();
                    return a;
                }else if (userField.getText().equals("") || pwField.getText().equals("")){
                    errorLabel.setText("Felder dürfen nicht leer stehen");
                    PauseTransition pause = new PauseTransition(Duration.seconds(2));
                    pause.setOnFinished(e ->
                            errorLabel.setText(null)
                    );
                    pause.play();
                    return a;
                }
                System.out.println(rs.getString("Username"));
            }
            a = true;
        }
        // Handle any errors that may have occurred.
        catch (SQLException e) {
            e.printStackTrace();
        }
        return a;
    }

    public void login(ActionEvent event)throws IOException{
        if(checkUser()){
            StudyApp.currentUser = new User(userField.getText(), pwField.getText());
            FXMLLoader loader = new FXMLLoader(getClass().getResource("mainMenue.fxml"));
            root = loader.load();
            MainMenueController mainMenueController = loader.getController();
            stage = (Stage)((Node)event.getSource()).getScene().getWindow();
            scene = new Scene(root);

            String css = getClass().getResource("Style.css").toExternalForm();
            scene.getStylesheets().add(css);
            stage.setScene(scene);
            stage.show();
        }
    }

    public boolean checkUser(){
        boolean a = false;
        //check leeres Nutzerfeld
        if (userField.getText().equals("")){
            errorLabel.setText("Fehlender Nutzername");
            PauseTransition pause = new PauseTransition(Duration.seconds(2));
            pause.setOnFinished(e ->
                    errorLabel.setText(null)
            );
            pause.play();
            return a;
            //check leeres Passwortfeld
        }else if (pwField.getText().equals("")){
            errorLabel.setText("Fehlendes Passwort");
            PauseTransition pause = new PauseTransition(Duration.seconds(2));
            pause.setOnFinished(e ->
                    errorLabel.setText(null)
            );
            pause.play();
            return a;
        }else{
            try (Connection con = DriverManager.getConnection(CONNECTIONURL); Statement stmt = con.createStatement();) {
                String SQL = "SELECT * FROM [dbo].[User]";
                ResultSet rs = stmt.executeQuery(SQL);

                // Iterate through the data in the result set and display it.
                while (rs.next()) {
                    if (rs.getString("Username").equals(userField.getText())){
                        if (rs.getString("Password").equals(pwField.getText())){
                            a = true;
                            errorLabel.setText("Wilkommen");
                            return a;
                        }else{
                            errorLabel.setText("Falsches Passwort");
                            PauseTransition pause = new PauseTransition(Duration.seconds(2));
                            pause.setOnFinished(e ->
                                    errorLabel.setText("")
                            );
                            pause.play();
                            return a;
                        }
                    }
                }
                errorLabel.setText("Nutzer existiert nicht");
                PauseTransition pause = new PauseTransition(Duration.seconds(2));
                pause.setOnFinished(event ->
                    errorLabel.setText("")
                );
                pause.play();
                return a;
            }
            // Handle any errors that may have occurred.
            catch (SQLException e) {
                e.printStackTrace();
            }
            return a;
        }
    }

}