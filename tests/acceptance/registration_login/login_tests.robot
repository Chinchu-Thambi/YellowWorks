*** Settings ***
Documentation     Customer Registration Flow Related Test Cases
Test Setup        run keywords
...               Open browser and maximize
...               Delete All Cookies
Test Teardown     run keywords
#...               Mark LambdaTest Status
...               Close Browser
Suite Teardown    Update Global Test Status
Resource          login_keywords.robot
Resource          ../common_steps.robot

*** Test Cases ***
TC_LG_001_Verify user is able to signin and signout with a registered account
    [tags]  codebuild_ready     TC_LG_001    regression_suite
    GIVEN User is on the home page
    WHEN User brings up the navigation panel
        AND User logs in using valid email address and password
    THEN Login should be successful
        AND Logged in user should be accurate
        AND User should be able to log out succesfully

TC_LG_002_Verify user is unable to signin with an unregistered account
    [tags]  codebuild_ready     TC_LG_002     regression_suite
    GIVEN User is on the home page
    WHEN User brings up the navigation panel
        AND User trying to login with an unregistered email and password
    THEN Login should not be successful
        AND User can see the error message on login screen "Please check your email and password. If your previously signed up with Google or Facebook, click the links to access the Yellow account"

TC_LG_003_Verify user is not signout when clicks the Back after signin
    [tags]  codebuild_ready     TC_LG_003
    GIVEN User is on the home page
    WHEN User brings up the navigation panel
        AND User logs in using valid email address and password
    THEN Login should be successful
        AND Logged in user should be accurate
    WHEN User clicks the Back button
    THEN User is not signout
        AND User should be able to log out succesfully

TC_LG_004_Verify user log in using Facebook
    [tags]  codebuild_ready     TC_LG_004   regression_suite
    GIVEN User is on the home page
    WHEN User brings up the navigation panel
        AND User log in using Facebook credentials
    THEN Login should be successful
        AND Logged in user should be accurate
        AND User should be able to log out succesfully

TC_LG_005_Verify user log in using Google
    [tags]  codebuild_ready     TC_LG_005   regression_suite
    GIVEN User is on the home page
    WHEN User brings up the navigation panel
        AND User log in using Google credentials
    THEN Login should be successful
        AND Logged in user should be accurate
        AND User should be able to log out succesfully

TC_LG_006_Verify user log in using Yellow
    [tags]  codebuild_ready     TC_LG_006   regression_suite
    GIVEN User is on the home page
    WHEN User brings up the navigation panel
        AND User log in using Yellow staff credentials
    THEN Login should be successful for Staff