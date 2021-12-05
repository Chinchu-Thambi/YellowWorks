*** Settings ***
Documentation     Forgot Password Flow Related Test Cases
Test Setup        run keywords
...               Open browser and maximize
...               Delete All Cookies
Test Teardown     run keywords
#...               Mark LambdaTest Status
...               Close Browser
Suite Teardown    Update Global Test Status
Resource          forgot_password_keywords.robot

*** Test Cases ***
TC_FP_001_Verify user can perform forgot password
    [tags]  codebuild_ready     TC_FP_001   regression_suite
    GIVEN User has created and activated a new account
    WHEN User clicks on forgot password
        AND User provides the registered generic email address
        AND User clicks send code
    THEN User navigates to reset password screen
        And User receives an email notification for forgot password
    WHEN User successfully confirm the new password
    THEN User gets the reset password success message
        AND User automatically signed in successfully
        AND User should be able to sign out successfully

TC_FP_002_Verify user unable to perform forgot password for unregistered user account
    [tags]  codebuild_ready     TC_FP_002
    GIVEN User clicks on forgot password
    WHEN User provides the unregistered generic email address
        AND User clicks send code for error
    THEN User can see the error message on forgot password screen "Email address not found"

TC_FP_003_Verify back to sign in option is working
    [tags]  codebuild_ready     TC_FP_003
    GIVEN User clicks on forgot password
    WHEN User click the back to sign in button
    THEN User navigates to sign in screen

TC_FP_004_Verify invalid and mismatching new passwords
    [tags]  codebuild_ready       TC_FP_004   regression_suite
    GIVEN User has created and activated a new account
    WHEN User clicks on forgot password
        AND User provides the registered generic email address
        AND User clicks send code
    THEN User navigates to reset password screen
        And User receives an email notification for forgot password
    WHEN User provides an invalid new passwords
    THEN User can see the error message on forgot password screen "Password does not conform to policy: Password not long enough"
    WHEN User provides a mismatching new passwords
    THEN User can see the error message on forgot password screen "Confirmation needs to match password"
    WHEN User successfully confirm the new password
    THEN User gets the reset password success message
        AND User automatically signed in successfully
        AND User should be able to sign out successfully

TC_FP_005_Verify user can reset the password after getting an error for invalid code
    [tags]  codebuild_ready       TC_FP_005    regression_suite
    GIVEN User has created and activated a new account
    WHEN User clicks on forgot password
        AND User provides the registered generic email address
        AND User clicks send code
    THEN User navigates to reset password screen
        And User receives an email notification for forgot password
    WHEN User provides an empty passcode
    THEN User can see the error message on forgot password screen "You need to fill the verification code"
    WHEN User provides an invalid verification code
    THEN User can see the error message on forgot password screen "Invalid verification code provided, please try again."
    WHEN User successfully confirm the new password
    THEN User gets the reset password success message
        AND User automatically signed in successfully
        AND User should be able to sign out successfully

TC_FP_006_Verify user can reset the password using already got a code
    [tags]  codebuild_ready       TC_FP_006    regression_suite
    GIVEN User has created and activated a new account
    WHEN User clicks on forgot password
        AND User provides the registered generic email address
        AND User clicks send code
        And User receives an email notification for forgot password
    THEN User click on already got a code
        AND User navigates to reset password screen
    WHEN User successfully confirm the new password
    THEN User gets the reset password success message
       AND User automatically signed in successfully
       AND User should be able to sign out successfully


