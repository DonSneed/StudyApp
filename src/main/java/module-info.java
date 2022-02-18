module com.example.studyapp {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.studyapp to javafx.fxml;
    exports com.example.studyapp;
}