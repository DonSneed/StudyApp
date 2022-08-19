package com.example.studyapp;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;
import java.sql.*;

public class StudyApp extends Application {

    public static User currentUser;
    public static Katalog currentKat;
    public static String currentQ;


    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(StudyApp.class.getResource("login.fxml"));
        Scene scene = new Scene(fxmlLoader.load());
        String css = getClass().getResource("Style.css").toExternalForm();
        scene.getStylesheets().add(css);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        /*// Create datasource.
        String connectionUrl = "jdbc:sqlserver://127.0.0.1:1433;databaseName=StudyAppDB;user=Enrico;password=Sneed1;encrypt=true;trustServerCertificate=true;";

        try (Connection con = DriverManager.getConnection(connectionUrl); Statement stmt = con.createStatement();) {
            String SQL = "SELECT * from [dbo].[User]";
            ResultSet rs = stmt.executeQuery(SQL);

            // Iterate through the data in the result set and display it.
            while (rs.next()) {
                System.out.println(rs.getString("Username") + " " + rs.getString("Password"));
            }
        }
        // Handle any errors that may have occurred.
        catch (SQLException e) {
            e.printStackTrace();
        }*/

        launch();
    }
}