*** Settings ***
Documentation       Suite description
Test Setup          Open browser and maximize
Test Teardown       run keywords
#...                 Mark LambdaTest Status
...                 Close Browser
#Suite Teardown      Update Global Test Status
Resource            staff_assistance_keywords.robot
Resource            ../registration_login/login_keywords.robot

*** Test Cases ***
TC_STA_01_Validate Staff Assitance Journey - New Header Banner
    [Tags]  codebuild_ready     TC_STA_01
    GIVEN User is on the home page
    WHEN User brings up the navigation panel
        AND User perform yellow staff login
        AND Login should be successful
        AND Click select customer link
        AND Staff confirm the customer email address
        AND Staff confirm the company
    THEN Staff banner and valid content should be visible

TC_STA_02_Validate Staff Assitance Journey - Change Customer
    [Tags]  codebuild_ready     TC_STA_02
    GIVEN User is on the home page
    WHEN User brings up the navigation panel
        AND User perform yellow staff login
        AND Login should be successful
        AND Click select customer link
        AND Staff confirm the customer email address
        AND Staff confirm the company
        AND User change the customer
    THEN Staff banner and valid content should be visible for the changed customer

TC_STA_03_Validate Staff Assitance Journey - Change Customer
    [Tags]  codebuild_ready     TC_STA_03
    GIVEN User is on the home page
    WHEN User brings up the navigation panel
        AND User perform yellow staff login
        AND Login should be successful
        AND Click select customer link
        AND Confirm the customer email address for change company
        AND Staff confirm the company for change company
        AND User change the company
    THEN Staff banner and valid content should be visible for the changed company
