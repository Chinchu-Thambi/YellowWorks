*** Settings ***
Documentation    Account Settings Verification Steps
Test Setup          Open browser and maximize
Test Teardown       run keywords
#...                 Mark LambdaTest Status
...                 Close Browser
Suite Teardown      Update Global Test Status
Resource            ../registration_login/login_keywords.robot
Resource            ../registration_login/registration_keywords.robot
Resource            account_settings_keywords.robot


*** Test Cases ***
TC_AS_001_Verify Simple Customer Can Access Account Settings
    [Tags]  codebuild_ready     TC_AS_001
    GIVEN User is in home page
    WHEN User brings up the navigation panel
        AND User logs in using valid email address and password
        AND Login should be successful
        THEN User lands on Account Settings page
     THEN Account settings page should have business and Payment info of the customer

TC_AS_002_Verify updating the password via Account Settings
    [Tags]     TC_AS_002
    GIVEN User registers with Yellow
    WHEN User navigates to Account Settings page
        AND User lands on Account Settings page
        AND User updates the password
        AND User signs out successfully
    THEN User login with the new password should be successful

TC_AS_003_Verify user can proceed to Yellow Profile purchase from Account Settings page
     [Tags]     TC_AS_003
  GIVEN User registers with Yellow
    WHEN User navigates to Account Settings page
        AND User lands on Account Settings page
        AND User clicks on Set Up Profile
    THEN User lands on Yellow Profile page



