*** Settings ***
Documentation     Customer Registration Flow Related Test Cases
Test Setup        run keywords
...               Open browser and maximize
...               Delete All Cookies
Test Teardown     run keywords
#...               Mark LambdaTest Status
...               Close Browser
Suite Teardown    Update Global Test Status
Resource          registration_keywords.robot

*** Test Cases ***
TC_RG_001_User activation and login to the custormer portal
    [tags]  codebuild_ready     TC_RG_001    regression_suite
    GIVEN User is in home page and access sign up
    WHEN User signs up using a generic email address and valid user information
    THEN User redirects to the activation panel
        AND User receives an email notification for user registration
    WHEN User successfully activate the account with a valid activation code
    THEN User gets the activation success message
#        AND User receives an email notification for successful activation
        AND User automatically signed in successfully
        AND User should be able to sign out successfully

TC_RG_002_User resends the verification code and activate the user
    [tags]  codebuild_ready     TC_RG_002
    GIVEN User register to the portal with valid information
    WHEN User resend the activation code
    THEN User activate the profile with recent activation code
        AND User gets the activation success message
        AND User automatically signed in successfully
        AND User should be able to sign out successfully

TC_RG_003_User activates the user with an already used verification code
    [tags]  codebuild_ready     TC_RG_003      regression_suite
    GIVEN User register to the portal with valid information
    WHEN User receives an email notification for user registration
    THEN User successfully activate the account with a valid activation code
        AND User automatically signed in successfully
        AND User should be able to sign out successfully
    WHEN User register to the portal with valid information
        AND User tries to activate account with already used valid activation code
    THEN User can see the error message on registration screen "Invalid authorization code"

TC_RG_004_User activation with an existing activation code
    [tags]  codebuild_ready     TC_RG_004      regression_suite
    GIVEN User is in home page and access sign up
    WHEN User signs up using a generic email address and valid user information
    THEN User redirects to the activation panel
      AND User go back to the signup
      AND User go to already got a code
      AND User receives an email notification for user registration
    WHEN User successfully activate the account with a valid activation code
    THEN User gets the activation success message
      AND User automatically signed in successfully
      AND User should be able to sign out successfully
